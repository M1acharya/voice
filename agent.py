import logging
import asyncio
import json

from dotenv import load_dotenv

from livekit.agents import JobContext, WorkerOptions, cli
from livekit.agents.voice import Agent, AgentSession
from livekit.plugins import openai, sarvam

load_dotenv()

# ================= LOGGING =================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)

logger = logging.getLogger("voice")


# ================= AGENT =================
class Voice(Agent):

    def __init__(self, metadata=None) -> None:

        self.metadata = metadata or {}

        customer_name = self.metadata.get("customer_name", "")
        query = self.metadata.get("query", "")
        quantity = self.metadata.get("quantity", "")
        source = self.metadata.get("source", "")

        config_path = "config.json"
        system_prompt = "You are an AI Assistant."
        end_condition = ""
        voice_speaker = "simran"

        if os.path.exists(config_path):
            try:
                with open(config_path, "r") as f:
                    conf = json.load(f)
                    system_prompt = conf.get("system_prompt", system_prompt)
                    end_condition = conf.get("end_condition", "")
                    voice_speaker = conf.get("voice_speaker", "simran")
            except Exception as e:
                logger.error(f"Failed to read config.json: {e}")

        # Format variables
        final_prompt = system_prompt.replace("{source}", source)\
                                    .replace("{customer_name}", customer_name)\
                                    .replace("{query}", query)\
                                    .replace("{quantity}", quantity)
        
        if end_condition:
            final_prompt += f"\n\n========================================\nCALL END CONDITION\n========================================\n{end_condition}\n"

        super().__init__(

            instructions=final_prompt,

            # ================= STT =================
            stt=sarvam.STT(
                language="unknown",
                model="saaras:v3",
                mode="transcribe",
                flush_signal=True,
            ),

            # ================= LLM =================
            llm=openai.LLM(
                model="gpt-4o"
            ),

            # ================= TTS =================
            tts=sarvam.TTS(
                target_language_code="en-IN",
                model="bulbul:v3",
                speaker=voice_speaker,
                pace=1.05,
            ),
        )

    async def on_enter(self):

        await asyncio.sleep(0.8)

        source = self.metadata.get("source", "")
        customer_name = self.metadata.get("customer_name", "")
        query = self.metadata.get("query", "")

        # ================= OUTBOUND GREETING =================
        if source == "outbound-call":

            if query:

                greeting = (
                    f"Hi {customer_name}, this is Riya from OffiNeeds Corporate Gifting. "
                    f"I see you had an enquiry regarding {query}. Is that correct?"
                )

            else:

                greeting = (
                    f"Hi {customer_name}, this is Riya from OffiNeeds Corporate Gifting. "
                    f"You had contacted us regarding corporate gifting, right?"
                )

        # ================= INBOUND GREETING =================
        else:

            greeting = (
                "Hi, I am Riya from OffiNeeds Corporate Gifting. "
                "How may I assist you today?"
            )

        # IMPORTANT: use say() instead of generate_reply()
        await self.session.say(greeting)


# ================= ENTRYPOINT =================
async def entrypoint(ctx: JobContext):

    logger.info(f"Connected Room: {ctx.room.name}")

    # ================= METADATA =================
    metadata = {}

    try:
        if ctx.job.metadata:
            metadata = json.loads(ctx.job.metadata)

    except Exception as e:
        logger.error(f"Metadata parse error: {e}")

    logger.info(f"Metadata: {metadata}")

    # ================= SESSION =================
    session = AgentSession(

        # Better interruption handling
        allow_interruptions=True,

        # Faster response
        min_endpointing_delay=0.08,

        # Uses STT endpointing
        turn_detection="stt",
    )

    await session.start(
        room=ctx.room,
        agent=Voice(metadata=metadata),
    )


# ================= MAIN =================
if __name__ == "__main__":

    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            agent_name="voice",
        )
    )
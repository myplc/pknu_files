# 구글 제미나이 AI
from google import genai
import os
from dotenv import load_dotenv
load_dotenv()
gemkey = os.getenv("GEM_KEY")

def aiai(text):
    client = genai.Client(api_key=gemkey)
    response = client.models.generate_content(model="gemini-2.0-flash",contents=text + ";단, 400자 이내 그리고 서술형으로 친절하게 알려줘.")
    answer = response.text
    print(answer)
    return answer
    
if __name__=="__main__":
    aiai("gpt에 대해 설명해")
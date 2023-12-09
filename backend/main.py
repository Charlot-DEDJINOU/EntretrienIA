from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuration du middleware CORS
origins = [
    "http://localhost:3000",  # Ajoutez ici l'URL de votre application React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def preprocessing(response_ai):
    content = response_ai['content'].split('\n\n') if '\n\n' in response_ai['content'] else response_ai['content'].split('\n')
    c = content[1:] if len(content) > 1 else content
    if ":" in c and len(c) < 3:
        return c.split(":")[1]
    return c


def save_to_file(mode = False, **kargs):
    if mode :
        with open("questions_reponses.txt", "w") as file:
            for key, value in kargs.items():
                file.write(f"{key}: {value}\n")
    else:
        with open("questions_reponses.txt", "a") as file:
            for key, value in kargs.items():
                file.write(f"{key}: {value}\n")
        
def read_file():
    with open("questions_reponses.txt", "r") as file:
        content = file.read()
    return content

class RequestCV(BaseModel):
    offre : str
    cv : str


class RequestGeneral(BaseModel):
    question : str
    reponse : str


class ChatGPTResponse(BaseModel):
    choices: List[dict]

@app.post("/first")
async def first(request : RequestCV):

    offre = request.offre
    cv = request.cv

    save_to_file(True, offre=offre, cv=cv)

    chatgpt_api_key = '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'
    chatgpt_api_url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {chatgpt_api_key}',
    }


    first_prompt = f"""
        oublie toutes les reponses precedantes et commence ici
        ta tache serait de diriger un entretien où tu prendra la place d'un employeur (considere toi vraiment comme un employeur)

        ici c'est l'offre : {offre}

        ici c'est le cv du candidat : {cv}

        en premier lieu tu donne une salutation et tu pose la premiere question tout en te rapellant que la premiere question sera 
        en lien avec la presentation ou des question comme 'parler moi de vous'
        n'oublie pas de poser une seul question d'abord
        je me l'ascent que tu pose question sur la presentation en premiere position


        vas droit au but !!!! important
    """

    print(first_prompt)

    data = {
    'model': 'gpt-3.5-turbo',
    'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'},
                    {'role': 'user', 'content': first_prompt}]
    }

    


    try:
        response = requests.post(chatgpt_api_url, json=data, headers=headers, timeout=30)
        response.raise_for_status()

        first_response = preprocessing(response.json()['choices'][0]['message'])
        
        
        return first_response
    except requests.Timeout:
        raise HTTPException(status_code=504, detail="La requête a expiré en raison d'un délai d'attente trop long.")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la requête à l'API ChatGPT: {str(e)}")

# ------------------------------------------------------------------- 1 ----------------------------------------------------------------

@app.post("/second")
async def second(request: RequestGeneral):
    reponse = request.reponse
    question = request.question
    save_to_file(question=question, reponse=reponse)

    chatgpt_api_key = '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'
    chatgpt_api_url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {chatgpt_api_key}',
    }


    prompt = f"""
        voila les question et reponses precedante : {read_file()}
        ici c'est la reponse du candidat à la premiere question: {reponse}
        pose maintenant la deuxieme question en tenant compte de la reponse precedante
        vas droit au but
    """

    data = {
    'model': 'gpt-3.5-turbo',
    'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'},
                    {'role': 'user', 'content': prompt}]
    }

    


    try:
        response = requests.post(chatgpt_api_url, json=data, headers=headers, timeout=30)
        response.raise_for_status()

        response = preprocessing(response.json()['choices'][0]['message'])
        return response
    except requests.Timeout:
        raise HTTPException(status_code=504, detail="La requête a expiré en raison d'un délai d'attente trop long.")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la requête à l'API ChatGPT: {str(e)}")


# ------------------------------------------------------------------- 2 ----------------------------------------------------------------

@app.post("/third")
async def third(request: RequestGeneral):
    reponse = request.reponse
    question = request.question
    save_to_file(question=question, reponse=reponse)

    chatgpt_api_key = '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'
    chatgpt_api_url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {chatgpt_api_key}',
    }


    prompt = f"""
        voila les question et reponses precedante : {read_file()}
        ici c'est la reponse du candidat à la deuxieme question: {reponse}
        pose maintenant une question en tenant compte de la reponse precedante
        vas droit au but
    """

    data = {
    'model': 'gpt-3.5-turbo',
    'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'},
                    {'role': 'user', 'content': prompt}]
    }

    


    try:
        response = requests.post(chatgpt_api_url, json=data, headers=headers, timeout=30)
        response.raise_for_status()
        print(response)

        response = preprocessing(response.json()['choices'][0]['message'])
        return response
    except requests.Timeout:
        raise HTTPException(status_code=504, detail="La requête a expiré en raison d'un délai d'attente trop long.")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la requête à l'API ChatGPT: {str(e)}")

# ------------------------------------------------------------------- 4 ----------------------------------------------------------------


@app.post("/fourth")
async def fourth(request: RequestGeneral):
    reponse = request.reponse
    question = request.question
    save_to_file(question=question, reponse=reponse)

    chatgpt_api_key = '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'
    chatgpt_api_url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {chatgpt_api_key}',
    }


    prompt = f"""
    voila les question et reponses precedante : {read_file()}
    ici c'est la reponse du candidat à la troisieme question: {reponse}

    en tenant compte des reponses, de l'offre et du cv, pose une question specifique
    au candidat ou ses projet

    vas droit au but
    """

    data = {
    'model': 'gpt-3.5-turbo',
    'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'},
                    {'role': 'user', 'content': prompt}]
    }

    


    try:
        response = requests.post(chatgpt_api_url, json=data, headers=headers, timeout=30)
        response.raise_for_status()

        response = preprocessing(response.json()['choices'][0]['message'])
        return response
    except requests.Timeout:
        raise HTTPException(status_code=504, detail="La requête a expiré en raison d'un délai d'attente trop long.")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la requête à l'API ChatGPT: {str(e)}")


# ------------------------------------------------------------------- 5 ----------------------------------------------------------------


@app.post("/five")
async def five(request: RequestGeneral):
    reponse = request.reponse
    question = request.question
    save_to_file(question=question, reponse=reponse)

    chatgpt_api_key = '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'
    chatgpt_api_url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {chatgpt_api_key}',
    }



    prompt = f"""
    voila les question et reponses precedante : {read_file()}
    ici c'est la reponse du candidat  question: {reponse}

    pose encore une question spécifique, l'avant derniere question

    vas droit au but

    """

    data = {
    'model': 'gpt-3.5-turbo',
    'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'},
                    {'role': 'user', 'content': prompt}]
    }

    


    try:
        response = requests.post(chatgpt_api_url, json=data, headers=headers, timeout=30)
        response.raise_for_status()

        response = preprocessing(response.json()['choices'][0]['message'])
        return response
    except requests.Timeout:
        raise HTTPException(status_code=504, detail="La requête a expiré en raison d'un délai d'attente trop long.")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la requête à l'API ChatGPT: {str(e)}")


# ------------------------------------------------------------------- 6 ----------------------------------------------------------------

@app.post("/six")
async def six(request: RequestGeneral):
    reponse = request.reponse
    question = request.question
    save_to_file(question=question, reponse=reponse)

    chatgpt_api_key = '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'
    chatgpt_api_url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {chatgpt_api_key}',
    }


    prompt = f"""
    voila les question et reponses precedante : {read_file()}
    ici c'est la reponse du candidat  question: {reponse}

    Pose une question pour finir l'entretien

    vas droit au but

    """

    data = {
    'model': 'gpt-3.5-turbo',
    'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'},
                    {'role': 'user', 'content': prompt}]
    }

    


    try:
        response = requests.post(chatgpt_api_url, json=data, headers=headers, timeout=30)
        response.raise_for_status()

        response = preprocessing(response.json()['choices'][0]['message'])
        return response
    except requests.Timeout:
        raise HTTPException(status_code=504, detail="La requête a expiré en raison d'un délai d'attente trop long.")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la requête à l'API ChatGPT: {str(e)}")

# ------------------------------------------------------------------- 7 ----------------------------------------------------------------

@app.post("/suggestion")
async def suggestion():
    

    chatgpt_api_key = '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'
    chatgpt_api_url = 'https://api.openai.com/v1/chat/completions'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {chatgpt_api_key}',
    }

    content = read_file()

    prompt = f"""
    voici la conversation de l'entretien : {content}

    Ta tache ici serait de faire les proposition d'amelioration des reponses
    proposé par le candidat de facon spécifique. Des suggestions personnalisée au candidat.

    soit vraiment spécifique par rapport à la conversation
    fais ça en un paragraphe bien precis et detaillé

    vas droit au but

    """

    data = {
    'model': 'gpt-3.5-turbo',
    'messages': [{'role': 'system', 'content': 'You are a helpful assistant.'},
                    {'role': 'user', 'content': prompt}]
    }

    try:
        response = requests.post(chatgpt_api_url, json=data, headers=headers, timeout=30)
        response.raise_for_status()

        response = preprocessing(response.json()['choices'][0]['message'])
        return response
    except requests.Timeout:
        raise HTTPException(status_code=504, detail="La requête a expiré en raison d'un délai d'attente trop long.")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la requête à l'API ChatGPT: {str(e)}")
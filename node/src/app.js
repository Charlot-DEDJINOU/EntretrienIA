const express = require('express');
const multer = require('multer');
const PDFParser = require('pdf-parse');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios')

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const preprocessing = (response_ai) => {
  const content = response_ai['content'].split('\n\n') || response_ai['content'].split('\n');
  const c = content.length > 1 ? content.slice(1) : content;
  return c.includes(':') && c.length < 3 ? c.split(':')[1] : c;
};

const saveToFile = (mode = false, kargs) => {
  const fileName = "questions_reponses.txt";
  const fileContent = Object.entries(kargs).map(([key, value]) => `${key}: ${value}`).join('\n');
  
  if (mode) {
      fs.writeFileSync(fileName, fileContent);
  } else {
      fs.appendFileSync(fileName, fileContent);
  }
};

const readFile = () => {
  const fileName = "questions_reponses.txt";
  return fs.existsSync(fileName) ? fs.readFileSync(fileName, 'utf-8') : '';
};

app.post("/first", async (req, res) => {
  try {
      const { offre, cv } = req.body;

      saveToFile(true, { offre, cv });

      const chatgptApiKey = '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';
      const chatgptApiUrl = 'https://api.openai.com/v1/chat/completions';

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatgptApiKey}`,
      };

      const firstPrompt = `
          oublie toutes les reponses precedantes et commence ici
          ta tache serait de diriger un entretien où tu prendra la place d'un employeur (considere toi vraiment comme un employeur)

          ici c'est l'offre : ${offre}

          ici c'est le cv du candidat : ${cv}

          en premier lieu tu donne une salutation et tu pose la premiere question tout en te rappelant que la premiere question sera 
          en lien avec la presentation ou des question comme 'parler moi de vous'
          n'oublie pas de poser une seul question d'abord
          je me l'ascent que tu pose question sur la presentation en premiere position

          vas droit au but !!!! important
      `;

      console.log(firstPrompt);

      const data = {
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: firstPrompt },
          ],
      };

      const response = await axios.post(chatgptApiUrl, data, { headers, timeout: 30000 });
      const firstResponse = preprocessing(response.data.choices[0].message);

      return res.json({ firstResponse });
  } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête.' });
  }
});

app.post("/second", async (req, res) => {
  try {
      const { question, reponse } = req.body;

      saveToFile(false, { question, reponse });

      const chatgptApiKey = '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';
      const chatgptApiUrl = 'https://api.openai.com/v1/chat/completions';

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatgptApiKey}`,
      };

      const prompt = `
          voila les question et reponses precedante : ${readFile()}
          ici c'est la reponse du candidat à la premiere question: ${reponse}
          pose maintenant la deuxieme question en tenant compte de la reponse precedante
          vas droit au but
      `;

      const data = {
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: prompt },
          ],
      };

      const response = await axios.post(chatgptApiUrl, data, { headers, timeout: 30000 });
      const processedResponse = preprocessing(response.data.choices[0].message);

      return res.json({ processedResponse });
  } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête.' });
  }
});

app.post("/third", async (req, res) => {
  try {
      const { question, reponse } = req.body;

      saveToFile(false, { question, reponse });

      const chatgptApiKey = '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';
      const chatgptApiUrl = 'https://api.openai.com/v1/chat/completions';

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatgptApiKey}`,
      };

      const prompt = `
          voila les question et reponses precedante : ${readFile()}
          ici c'est la reponse du candidat à la deuxieme question: ${reponse}
          pose maintenant une question en tenant compte de la reponse precedante
          vas droit au but
      `;

      const data = {
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: prompt },
          ],
      };

      const response = await axios.post(chatgptApiUrl, data, { headers, timeout: 30000 });
      const processedResponse = preprocessing(response.data.choices[0].message);

      return res.json({ processedResponse });
  } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête.' });
  }
});

app.post("/fourth", async (req, res) => {
  try {
      const { question, reponse } = req.body;

      saveToFile(false, { question, reponse });

      const chatgptApiKey = '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';
      const chatgptApiUrl = 'https://api.openai.com/v1/chat/completions';

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatgptApiKey}`,
      };

      const prompt = `
          voila les question et reponses precedante : ${readFile()}
          ici c'est la reponse du candidat à la troisieme question: ${reponse}

          en tenant compte des reponses, de l'offre et du cv, pose une question specifique
          au candidat ou ses projet

          vas droit au but
      `;

      const data = {
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: prompt },
          ],
      };
      
      const response = await axios.post(chatgptApiUrl, data, { headers, timeout: 50000 });
      const processedResponse = preprocessing(response.data.choices[0].message);

      return res.json({ processedResponse });
  } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête.' });
  }
});

app.post("/five", async (req, res) => {
  try {
      const { question, reponse } = req.body;

      saveToFile(false, { question, reponse });

      const chatgptApiKey = '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';
      const chatgptApiUrl = 'https://api.openai.com/v1/chat/completions';

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatgptApiKey}`,
      };

      const prompt = `
          voila les question et reponses precedante : ${readFile()}
          ici c'est la reponse du candidat  question: ${reponse}

          pose encore une question spécifique, l'avant-dernière question

          vas droit au but
      `;

      const data = {
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: prompt },
          ],
      };

      const response = await axios.post(chatgptApiUrl, data, { headers, timeout: 30000 });
      const processedResponse = preprocessing(response.data.choices[0].message);

      return res.json({ processedResponse });
  } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête.' });
  }
});

app.post("/six", async (req, res) => {
  try {
      const { question, reponse } = req.body;

      saveToFile(false, { question, reponse });

      const chatgptApiKey = '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';
      const chatgptApiUrl = 'https://api.openai.com/v1/chat/completions';

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatgptApiKey}`,
      };

      const prompt = `
          voila les question et reponses precedante : ${readFile()}
          ici c'est la reponse du candidat  question: ${reponse}

          Pose une question pour finir l'entretien

          vas droit au but
      `;

      const data = {
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: prompt },
          ],
      };

      const response = await axios.post(chatgptApiUrl, data, { headers, timeout: 30000 });
      const processedResponse = preprocessing(response.data.choices[0].message);

      return res.json({ processedResponse });
  } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête.' });
  }
});

app.post("/suggestion", async (req, res) => {
  try {
      const chatgptApiKey = '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';
      const chatgptApiUrl = 'https://api.openai.com/v1/chat/completions';

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatgptApiKey}`,
      };

      const content = readFile();

      const prompt = `
          voici la conversation de l'entretien : ${content}

          Ta tache ici serait de faire les proposition d'amelioration des reponses
          proposé par le candidat de facon spécifique. Des suggestions personnalisée au candidat.

          soit vraiment spécifique par rapport à la conversation
          fais ça en un paragraphe bien precis et detaillé

          vas droit au but
      `;

      const data = {
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: prompt },
          ],
      };

      const response = await axios.post(chatgptApiUrl, data, { headers, timeout: 30000 });
      const processedResponse = preprocessing(response.data.choices[0].message);

      return res.json({ processedResponse });
  } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête.' });
  }
});

app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  try {
    const data = await PDFParser(req.file.buffer);
    const extractedText = data.text;
    
    res.json({ extractedText });
  } catch (error) {
    console.error('Erreur lors de l\'extraction du texte du PDF :', error);
    res.status(500).json({ error: 'Erreur lors de l\'extraction du texte du PDF.' });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
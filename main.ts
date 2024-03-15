import {
  Ollama,
  Document,
  VectorStoreIndex,
  serviceContextFromDefaults,
} from "llamaindex";
import { config } from "dotenv";

const env = config();

async function main() {
  // Create an instance of the LLM
  const ollamaLLM = new Ollama({ model: env.MODEL, temperature: 0.3 });

  // Load data file set in the .env file
  const path = env.FILE_PATH;

  const dataFile = await Deno.readFile(path, "utf-8");

  // Create a service context
  const serviceContext = serviceContextFromDefaults({
    embedModel: ollamaLLM,
    llm: ollamaLLM,
  });

  // Create Document object with essay
  const document = new Document({ text: dataFile, id_: path });

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document], {
    serviceContext,
  });

  // get retriever
  const retriever = index.asRetriever();

  // Create a query engine
  const queryEngine = index.asQueryEngine({
    retriever,
  });

  // Create a query
  const query =
    "Cómo está constituido el gobierno y la sociedad de la república de Venezuela?";

  //  query the index
  const response = await queryEngine.query({ query });

  // Output response
  console.log(response.toString());
}

main().catch(console.error);

// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// type Message = {
//   role: "user" | "bot";
//   content: string | object; // Allow both string and object
// };

// const rainbowTheme = {
//   ...vscDarkPlus,
//   'code[class*="language-"]': {
//     ...vscDarkPlus['code[class*="language-"]'],
//     color: "#ff6b6b", // Red
//   },
//   'pre[class*="language-"]': {
//     ...vscDarkPlus['pre[class*="language-"]'],
//     background: "#1e1e1e",
//     padding: "10px",
//     borderRadius: "5px",
//     overflowX: "auto",
//   },
//   'span.token.keyword': { color: "#ff6b6b" },
//   'span.token.function': { color: "#f6f96e" },
//   'span.token.string': { color: "#6bf9e3" },
//   'span.token.comment': { color: "#a29bfe" },
//   'span.token.operator': { color: "#ffb86c" },
//   'span.token.number': { color: "#bd93f9" },
// };

// const Chatit: React.FC = () => {
//   const [input, setInput] = useState<string>("");
//   const [messages, setMessages] = useState<Message[]>([]);

//   const sendMessage = async () => {
//     if (!input) return;

//     const userMessage: Message = { role: "user", content: input };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);

//     try {
//       const response = await axios.post("https://text.pollinations.ai/", {
//         messages: [userMessage],
//         model: "mistral",
//         seed: "12345",
//         jsonMode: true,
//       });

//       console.log("API Response:", response.data); // Log the response for debugging

//       let content: string | object = "I couldn't retrieve the content."; // Default content

//       // Dynamic content retrieval
//       if (typeof response.data === "string") {
//         content = response.data; // If the response is a simple string
//       } else if (response.data.code) {
//         content = response.data.code; // Direct code
//       } else if (response.data.program?.code) {
//         content = response.data.program.code; // Nested code
//       } else {
//         content = response.data; // Fallback to raw data
//       }

//       const botMessage: Message = {
//         role: "bot",
//         content,
//       };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       const botMessage: Message = {
//         role: "bot",
//         content: "An error occurred while fetching the response. Please try again.",
//       };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     }

//     setInput("");
//   };

//   const detectLanguage = (text: string): string => {
//     if (typeof text !== "string") return "text"; // Fallback to text if not a string

//     if (text.includes("#include") || text.includes("int main")) return "cpp";
//     if (text.includes("def ") || text.includes("print(")) return "python";
//     if (text.includes("console.log") || text.includes("function")) return "javascript";
//     if (text.includes("public class") || text.includes("System.out.println")) return "java";
//     if (text.includes("<html>") || text.includes("<body>")) return "html";
//     return "text"; // Default fallback
//   };

//   const renderMessageContent = (content: string | object) => {
//     let displayContent: string;

//     if (typeof content === "object") {
//       displayContent = JSON.stringify(content, null, 2); // Convert object to string for display
//     } else {
//       displayContent = content; // Directly use the string
//     }

//     const codeBlocks = displayContent.split("\n\n"); // Split by double newline for multiple code blocks

//     return codeBlocks.map((block, index) => {
//       const language = detectLanguage(block);
//       return (
//         <div key={index}>
//           {language !== "text" ? (
//             <SyntaxHighlighter language={language} style={rainbowTheme}>
//               {block}
//             </SyntaxHighlighter>
//           ) : (
//             <span>{block}</span> // Render plain text if not code
//           )}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="container mx-auto flex flex-col gap-2 h-screen justify-center items-center">
//       <div>
//         <h2>Chatbot</h2>
//         <div className="lg:w-[1080px] lg:h-[720px] w-full bg-slate-400/10 border-2 border-green-500 overflow-y-auto px-3 py-2 rounded-t-lg">
//           {messages.map((msg, index) => (
//             <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
//               <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
//               {msg.role === "bot" ? renderMessageContent(msg.content) : msg.content}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex w-full justify-center">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message here..."
//           className="lg:w-full h-[3rem] relative pr-[12%] pl-[1%] text-black max-w-[1080px] overflow-hidden rounded-md"
//         />
//         <button onClick={sendMessage} className="absolute text-black bg-green-400 h-[3rem] w-[10%] right-[18.4%] rounded-r-md">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatit;

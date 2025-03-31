import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { FaComments, FaCircle } from "react-icons/fa";
import { toast } from "sonner";
import { Send, X } from "lucide-react";
import axios from "axios";
import { CHATBOT_API_END_POINT } from "@/utils/constant";
import './ChatBot.css';
const ChatBoat = () => {
    const [chatBoatOpen, setChatBoatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi there! How can I help you today?" },
        { sender: "bot", text: "I can answer questions about job opportunities or other inquiries!" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([
        "Job Opportunities",
        "Application Process",
        "Interview Tips",

        "Company Culture",

        "Resume Building",
        "Networking Tips",

    ]);


    const messagesEndRef = useRef(null);

    const handleSendMessage = async (message) => {
        if (!message.trim()) return;

        setMessages((prev) => [...prev, { sender: "user", text: message }]);
        setNewMessage("");
        setLoading(true);

        try {
            const response = await axios.post(
                CHATBOT_API_END_POINT,
                { message },
                { withCredentials: true }
            );

            const botMessage = response.data.message || "I didn't understand that.";
            simulateTypingEffect(botMessage);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const simulateTypingEffect = (fullMessage) => {
        const words = fullMessage.split(" ");
        let currentMessage = "";
        let index = 0;

        setMessages((prev) => [...prev, { sender: "bot", text: "..." }]);

        const typingInterval = setInterval(() => {
            if (index < words.length) {
                currentMessage += (index > 0 ? " " : "") + words[index];
                index++;

                setMessages((prev) =>
                    prev.map((msg, idx) =>
                        idx === prev.length - 1
                            ? { sender: "bot", text: currentMessage }
                            : msg
                    )
                );
            } else {
                clearInterval(typingInterval);
            }
        }, 200);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Check if the last message matches the category introduction
    const shouldShowCategories = messages.some(
        (message) =>
            message.sender === "bot" &&
            message.text === "I can answer questions about job opportunities or other inquiries!"
    );

    return (
        <div className="fixed bottom-4 right-4 z-50">
            { chatBoatOpen ? (
                <Card className="w-full max-w-md p-4 flex flex-col space-y-4 shadow-lg bg-gradient-to-br from-[#00040A] to-[#001636] border border-blue-600 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <h2 className="font-bold text-lg text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                Hire Hub
                            </h2>
                            <FaCircle className="text-green-500" />
                        </div>
                        <Button
                            variant="ghost"
                            onClick={ () => setChatBoatOpen(false) }
                            className="text-blue-500 hover:text-white hover:bg-gray-500"
                        >
                            <X />
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md p-3 max-h-64">
                        { messages.map((message, index) => (
                            <div
                                key={ index }
                                className={ `flex ${message.sender === "user" ? "justify-end" : "justify-start"}` }
                            >
                                <div
                                    className={ `p-2 rounded-lg max-w-full ${message.sender === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-700 text-white"
                                        }` }
                                >
                                    { message.text }
                                </div>
                            </div>
                        )) }
                        { loading && (
                            <div className="flex justify-start ml-1">
                                <div className="loader"></div>
                            </div>
                        ) }
                        <div ref={ messagesEndRef } />
                    </div>
                    { shouldShowCategories && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            { categories.map((category, idx) => (
                                <Button
                                    key={ idx }
                                    className="bg-blue-400 hover:bg-blue-600 text-white px-2 py-1 rounded-full text-sm"
                                    onClick={ () => handleSendMessage(category) }
                                >
                                    { category }
                                </Button>
                            )) }
                        </div>
                    ) }
                    <div className="flex items-center space-x-2 mt-3">
                        <Input
                            placeholder="Type a message..."
                            value={ newMessage }
                            onChange={ (e) => setNewMessage(e.target.value) }
                            className="flex-1 border-blue-300 bg-transparent text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
                        />
                        <Button
                            onClick={ () => handleSendMessage(newMessage) }
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            disabled={ loading }
                        >
                            <Send />
                        </Button>
                    </div>
                </Card>
            ) : (
                <Button
                    onClick={ () => setChatBoatOpen(true) }
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 bounce"
                >
                    <FaComments className="text-xl" />
                    <span>ASK ME</span>
                </Button>
            ) }
        </div>
    );
};

export default ChatBoat;

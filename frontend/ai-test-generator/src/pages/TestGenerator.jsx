import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiSend, FiCode, FiCopy, FiDownload } from 'react-icons/fi';

const TestGenerator = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Hello! Upload a Java file and I\'ll help you generate JUnit tests for it. You can also ask me questions about testing!',
            sender: 'ai'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [javaFile, setJavaFile] = useState(null);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.name.endsWith('.java')) {
            setJavaFile(file);

            // Add user message
            const newMessage = {
                id: messages.length + 1,
                text: `Uploaded file: ${file.name}`,
                sender: 'user',
                isFile: true,
                fileName: file.name,
                fileContent: ''
            };

            // Read file content
            const reader = new FileReader();
            reader.onload = (e) => {
                newMessage.fileContent = e.target.result;
                addMessage(newMessage);
                // Auto-generate tests after file upload
                generateTests(file, newMessage.fileContent);
            };
            reader.readAsText(file);
        } else {
            addMessage({
                id: messages.length + 1,
                text: 'Please upload a valid .java file',
                sender: 'ai',
                isError: true
            });
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.java',
        multiple: false,
    });

    const addMessage = (message) => {
        setMessages(prev => [...prev, message]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user'
        };

        addMessage(userMessage);
        setInputMessage('');

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                text: getAIResponse(inputMessage, javaFile),
                sender: 'ai',
                isCode: inputMessage.toLowerCase().includes('generate test') ||
                    inputMessage.toLowerCase().includes('create test')
            };
            addMessage(aiResponse);
        }, 1000);
    };

    const getAIResponse = (message, file) => {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! How can I assist you with your Java testing today?';
        } else if (lowerMessage.includes('generate test') || lowerMessage.includes('create test')) {
            if (!file) {
                return 'Please upload a Java file first so I can generate tests for it.';
            }
            // This will be replaced with actual test generation
            return 'I\'ve analyzed your code and generated the following test cases:';
        } else if (lowerMessage.includes('thank')) {
            return 'You\'re welcome! Let me know if you need anything else.';
        }

        return 'I can help you generate JUnit tests for your Java code. Try uploading a Java file and asking me to generate tests for it!';
    };

    const generateTests = async (file, fileContent) => {
        setIsLoading(true);

        // Add loading message
        const loadingMessage = {
            id: messages.length + 1,
            text: 'Analyzing your Java file and generating tests...',
            sender: 'ai',
            isLoading: true
        };
        addMessage(loadingMessage);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Generate mock test content
            const testContent = `// Generated test for ${file.name}\n` +
                'import org.junit.jupiter.api.Test;\n' +
                'import org.junit.jupiter.api.extension.ExtendWith;\n' +
                'import org.mockito.InjectMocks;\n' +
                'import org.mockito.Mock;\n' +
                'import org.mockito.junit.jupiter.MockitoExtension;\n\n' +
                '@ExtendWith(MockitoExtension.class)\n' +
                `public class ${file.name.replace('.java', '')}Test {\n\n` +
                '    @Test\n' +
                '    public void testMethod1() {\n' +
                '        // Test implementation\n' +
                '    }\n\n' +
                '    @Test\n' +
                '    public void testMethod2() {\n' +
                '        // Test implementation\n' +
                '    }\n' +
                '}';

            // Remove loading message and add test content
            setMessages(prev => {
                const newMessages = prev.filter(m => !m.isLoading);
                return [
                    ...newMessages,
                    {
                        id: messages.length + 2,
                        text: 'I\'ve analyzed your code and generated the following test cases:',
                        sender: 'ai'
                    },
                    {
                        id: messages.length + 3,
                        text: testContent,
                        sender: 'ai',
                        isCode: true,
                        fileName: file.name.replace('.java', 'Test.java')
                    }
                ];
            });
        } catch (error) {
            console.error('Error generating tests:', error);
            addMessage({
                id: messages.length + 1,
                text: 'Sorry, there was an error generating tests. Please try again.',
                sender: 'ai',
                isError: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    const downloadFile = (content, filename) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // In a real app, you might want to show a toast notification
        alert('Code copied to clipboard!');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-3xl rounded-lg px-4 py-2 ${message.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : message.isError
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-white shadow'
                                }`}
                        >
                            {message.isFile ? (
                                <div className="flex items-center space-x-2">
                                    <FiCode className="h-5 w-5" />
                                    <span>{message.text}</span>
                                </div>
                            ) : message.isCode ? (
                                <div className="relative">
                                    <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
                                        <pre className="text-sm">{message.text}</pre>
                                    </div>
                                    <div className="absolute top-2 right-2 flex space-x-2">
                                        <button
                                            onClick={() => copyToClipboard(message.text)}
                                            className="p-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                                            title="Copy to clipboard"
                                        >
                                            <FiCopy className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => downloadFile(message.text, message.fileName)}
                                            className="p-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                                            title="Download file"
                                        >
                                            <FiDownload className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : message.isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-pulse flex space-x-2">
                                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                                    </div>
                                    <span>{message.text}</span>
                                </div>
                            ) : (
                                <p className="whitespace-pre-wrap">{message.text}</p>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-center space-x-2">
                    <div
                        {...getRootProps()}
                        className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                        title="Upload Java file"
                    >
                        <input {...getInputProps()} />
                        <FiUpload className="h-6 w-6" />
                    </div>
                    <form onSubmit={handleSendMessage} className="flex-1 flex">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message or upload a Java file..."
                            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={!inputMessage.trim() || isLoading}
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FiSend className="h-5 w-5" />
                        </button>
                    </form>
                </div>
                {isDragActive && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                            <FiUpload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-900">Drop the Java file to upload</p>
                            <p className="text-sm text-gray-500 mt-1">I'll analyze it and help you generate tests</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestGenerator;

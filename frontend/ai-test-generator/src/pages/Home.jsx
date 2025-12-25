import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        <span className="block">JUnit Test Generator</span>
                        <span className="block text-blue-600">Automate Your Java Testing</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-500">
                        Upload your Java files and automatically generate comprehensive JUnit 5 + Mockito test cases
                        with just a few clicks.
                    </p>
                    <div className="mt-10">
                        <Link
                            to="/generate"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>

                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">How It Works</h3>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl font-bold mb-4">
                                1
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Java File</h4>
                            <p className="text-gray-600">
                                Upload any Java file (Controller, Service, Repository, or Utility class).
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl font-bold mb-4">
                                2
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Generate Tests</h4>
                            <p className="text-gray-600">
                                Our AI analyzes your code and generates comprehensive JUnit 5 + Mockito tests.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-xl font-bold mb-4">
                                3
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Download & Use</h4>
                            <p className="text-gray-600">
                                Download the generated test file and integrate it into your project.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

import CurrencyConvert from "./components/CurrencyConvert";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex  flex-col items-center justify-center ">
      <div className="container mx-auto max-w-lg p-4">
        <CurrencyConvert />
      </div>
    </div>
  );
};

export default App;

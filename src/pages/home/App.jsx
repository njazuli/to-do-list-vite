import './App.css';
import TodoList from '../../components/TodoList';
import TodoInput from '../../components/TodoInput';
import { TodoProvider } from '../../context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <div className="container px-1 py-3 max-w-[360px] sm:max-w-[560px] md:px-6 md:py-12 mx-auto h-auto bg-white flex items-center flex-col md:border md:gray-600 md:rounded-lg sm:shadow-xl">
        <div>
          <img src="/assets/logo.png" width="120" alt="logo" />
        </div>
        <p className="text-black text-2xl mb-2 mt-3">To-do List App 📋</p>
        {/* input section */}
        <TodoInput />
        {/* list section */}
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;

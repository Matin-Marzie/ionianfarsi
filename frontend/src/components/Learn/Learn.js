
import Header from "./Header.js";
import Main from "./Main/Main.js";


export default function Learn() {

  
return (
  <div className="m-auto flex flex-col h-full w-full max-w-screen-md">
    {/* Header is part of the flex-col flow */}
    <Header />
    <Main />
  </div>
  
);

}

import NavBar from "@/Components/NavBar";
import { useEffect, useState } from "react";


function Home() {
   const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  useEffect(() => {
      const handleScroll = () => {
        setHasScrolled(window.scrollY > 10);
      };
  
      window.addEventListener("scroll", handleScroll);
      handleScroll();
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <div >
      
      <NavBar hasShadow={hasScrolled} />

      <div className="flex justify-center mt-[120px]"
      style={{
                height: "2000px",
              }}
      >
        <ul>
           <li>home</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
        mollitia corrupti consequuntur quis nisi tempore pariatur nulla quas
        laboriosam hic ipsum deleniti placeat eligendi, odio officia, aut error
        cupiditate aliquam sequi ea eveniet accusantium non obcaecati. Ea totam
        sequi voluptatem tempore cum sunt ipsum, optio dolorem nostrum quae,
        dolore minus sapiente, nulla alias quibusdam. Ab totam ut reiciendis
        laboriosam architecto eos maxime quam illo qui rem vitae magnam
        consequuntur, suscipit temporibus delectus, maiores dolore dolorum
        provident fugiat ducimus eaque aliquam facere vel ipsa. Porro esse animi
        labore consectetur, provident aut velit. Facere nesciunt ex, facilis
        exercitationem corporis sapiente quis quod!</li>
        </ul>
       
      </div>
    </div>
  );
}

export default Home;

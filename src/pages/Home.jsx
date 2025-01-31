
import Hero from "../component/Hero"
import CardSlider from "../component/CardSlider"
import BestSeller from "../component/BestSeller"
import CollectionSection from "../component/CollectionSection"
import TokenChecker from "../component/TokenChecker"

export default function Home(){
    return(
        <>
        
        {/* <TokenChecker />  */}
        <Hero/>
        <CardSlider/>
 
        <CollectionSection/>
     
        </>

    )
}


import React, { useEffect, useState } from 'react'

export default function SuperHeroInfo() {
    //this state stores all the heroes in an array
    const [allHeroes, setAllHeroes] = useState([])

    //this state stores the users type in data
    const [searchedInfo, setSearchedInfo] = useState('')

    //this state filters through the data by comparing the API's data and the users typed in data
    const [filteredHeroes, setFilteredHeroes] = useState([])

    //handles the state on if the modal should show or not
    const [modalIsOpen, setModalIsOpen] = useState(false)

    //handles the state of the hero card clicked 
    const [selectedHero, setSelectedHero] = useState(null)

    //this state handles errors
    const [errors, setErrors] = useState('')

    //this state handles loading state for searches
    const [isSearching, setIsSearching] = useState(false)

    //this useEffect ensures we don't reload 700+ heroes multiple times, in the case we put it in the handleSearch function
    //think of it like a library where all the information is already on the shelves
    //while the handleSearch is a person going through the library looking for a specific book
    useEffect(() => {
        const fetchHero = async () => {
            try {
                //fetch logic
                const response = await fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api//all.json')
                const heroData = await response.json()
                //assign all hero data to the allHeroes array
                setAllHeroes(heroData)
            } catch (error) {
                setErrors('Data could not be found')
            }
        }
        // Fetch ALL heroes ONCE when component loads
        fetchHero()
    }, [])

    // useEffect to handle body scroll lock when modal opens/closes
    useEffect(() => {
        if (modalIsOpen) {
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }
        
        // Cleanup function to remove class when component unmounts
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [modalIsOpen])

    //our handleSearch function that filters the data by the user's input
    //it goes through the huge information looking for specific things
    const handleSearch = async () => {
        //if the input field is empty and the search/enter action occurs, print the error and clear the page 
        if (searchedInfo.trim() === '') {
            setErrors('No name entered, try again')
            setFilteredHeroes([])
            return // ← Added return to stop execution
        }

        // Start searching state
        setIsSearching(true)
        setErrors('') // Clear any previous errors
        setFilteredHeroes([]) // Clear previous results

        // Add a small delay to make the loading visible 
        setTimeout(() => {
            //go thorugh the allHeroes array and filter out the data that fits what the user typed in
            const foundHero = allHeroes.filter((item) => {
                const searchItem = searchedInfo.toLowerCase()

                // Added null checks to prevent errors
                // if theres a name AND a name in the data that includes the info the user typed in, 
                // store it and ensure its in the lowercase version
                const heroName = item.name && item.name.toLowerCase().includes(searchItem)

                //if the hero has a biography AND if that biography has a full name,
                //then store it and ensure its in the lowercase version
                const realName = item.biography?.fullName && item.biography.fullName.toLowerCase().includes(searchItem)

                // "Hey hero, if you have a biography, and if that biography has a publisher, 
                //  then give me the lowercase version"
                const publisherName = item.biography?.publisher && item.biography.publisher.toLowerCase().includes(searchItem)
                
                //if hero has the connections property AND if that connections has a groupAffiliations property,
                //then store it and ensure its in the lowercase version
                const groupAffiliation = item.connections?.groupAffiliation && item.connections.groupAffiliation.toLowerCase().includes(searchItem)

                //if hero has the appearance property AND if that appearance has a race property,
                //then store it and ensure its in the lowercase version
                const race = item.appearance?.race && item.appearance.race.toLowerCase().includes(searchItem)

                //return the data if any of these are true
                return heroName || realName || publisherName || groupAffiliation  || race
            })

            //if the foundHero has heroes inside it, put them into the filteredHeroes array,
            //and clear its errors 
            if (foundHero.length > 0) {
                setFilteredHeroes(foundHero)
                console.log(foundHero)
                setErrors('')
            } 
            //else return the error,
            //and clear the filtered heroes
            else {
                setErrors('Superhero wasnt found, try again')
                setFilteredHeroes([])
            }

            // Stop searching state
            setIsSearching(false)
        }, 800) // Small delay to show loading spinner
    }

    //just a condition to check if the number of searched hero(es) is singular or plural
    const pluralName = filteredHeroes.length === 1 ? '' : 'es'

    //this function deals with when enter is pressed.
    //it should do the same thing as pressing the search button
    function handleEnterKeyPressed(e) {
        console.log('enter pressed')
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    //function that handles the logic for when a specific hero is clicked
    //it sets the modal to true so it can be opened on the webpage
    function handleHeroCardClicked(clickedHeroCard) {
        setSelectedHero(clickedHeroCard);
        setModalIsOpen(true)
    }

    //function for when the x button is pressed, which closes the modal
    function CloseModal() {
        setModalIsOpen(false)
        setSelectedHero(null)
    }

    const getStatColor = (value) => {
  if (value >= 80) return 'green';
  if (value >= 50) return 'orange';
  return 'red';
};

    const SingleOrMulltiple = filteredHeroes.length === 1 ? 'SingleCardGrid' : 'CardGrid'

    return (
        <div className='MainContainer'>
            <div className='HeaderContainer'>
                {/*Handles everything to do with the input field */}
                {/*Also included the onKeyDown listener, which ensures when the enter key is pressed,
                it does the same action as search. */}
                <h2>
                    HeroDex
                </h2>

                <p>
                    Search heroes by hero name, real name, publisher, team, or race
                </p>

                <div className='InputandSearch'>
                    <input 
                    className='InputField'
                    type="text"
                    placeholder='Enter some info'
                    onChange={(e) => setSearchedInfo(e.target.value)}
                    value={searchedInfo}
                    onKeyDown={handleEnterKeyPressed}
                    />
                    {/* deals with clicking the search button */}
                    <button
                    className='SearchBtn'
                    onClick={handleSearch} >Search</button>
                </div>
                
            </div>

            <div className='ContentContainer'>
                {/* Show loading spinner while searching */}
                {isSearching && (
                    <div className='loadingContainer'>
                        <div className='spinner'></div>
                        <p className='loadingMessage'>Searching hero database...</p>
                    </div>
                )}

                {/* Show errors only if errors exist and not searching */}
                {errors && !isSearching && <p key={errors} className='errorMessage'>{errors}</p>}
                
                {/* Show results only if we have hero(es) in the array, array is > 0, and not searching */}
                {filteredHeroes && filteredHeroes.length > 0 && !isSearching && (
                    <div className='ResultsContainer'>
                        <p className='resultsMessage'>Found {filteredHeroes.length} hero{pluralName}:</p>
                        <div className={SingleOrMulltiple}> 
                            {filteredHeroes.map((hero) => (
                                 //Made the Hero card a button so that it can return the modal with the heroes infomration                       
                                <button key={hero.id} className='HeroCard' onClick={() => handleHeroCardClicked(hero)} >

                                    <p>#{hero.id}</p>
                                    <img className='HeroCardImg' src={hero.images.lg} alt={hero.name} />
                                    <h2> {hero.name}</h2>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/*If the modalIsOpen is true & selectedHero is true do this code */}
                {modalIsOpen && selectedHero && (
                                        <div className='ModalOverlay'>
                                            <div className='ModalCard'>
                                                <div className='ModalCardTitle'>
                                                    <h2>{`#${selectedHero.id} - ${selectedHero.name}`}</h2>
                                                </div>
                                                
                                                <div className='ModalCardBody'>
                                                    <img src={selectedHero.images.lg} alt={selectedHero.name} />

                                                <div className='ModalCardContent'>

                                                    <h2 style={{ textDecoration: 'underline' }}>Basic Information</h2>
                                                    <div className='BasicInfo'>
                                                        
                                                            <span>Real Name: </span>
                                                            <span className='value'><strong>{selectedHero.biography?.fullName || 'Unknown'}</strong></span>
                                                        
                                                            <span>Alignment:</span>
                                                            <span className='value'><strong>{selectedHero.biography?.alignment.toUpperCase() || 'Unknown'}</strong></span>
                                                       
                                                            <span>First Appearance:</span>
                                                            <span className='value'><strong>{selectedHero.biography?.firstAppearance || 'Unknown'}</strong></span>
                                                        
                                                        {/* check if the hero has a biography, 
                                                        if so, check if it has a publisher, else return unknown.
                                                        If there is a publisher return it, 
                                                        else return unknown*/}
                                                       
                                                            <span>Publisher:</span>
                                                            <span className='value'> <strong>{selectedHero.biography?.publisher || 'Unknown'}</strong></span>
                                                       
                                                    </div>
                                                     
                                                     <h2 style={{ textDecoration: 'underline' }}>PowerStats</h2>
                                                     <div className='Powerstats'>
                                                        
                                                            
                                                            <span>Intelligence </span>
                                                            {/* this div handles how the stats bar should look */}
                                                            {/*The width of the bar goes according to whatever the stat of intelligence is */}
                                                            <div className='StatsBar'>
                                                                <div className='StatsFill' style={{width: `${selectedHero.powerstats?.intelligence}%`, 
                                                                backgroundColor: getStatColor(selectedHero.powerstats?.intelligence)}}></div>
                                                            </div>
                                                            <span className='value'> <strong> {selectedHero.powerstats?.intelligence || 'Unknown'}</strong> </span>
                                                            
                                                                
                                                            <span>Strength </span>
                                                            <div className='StatsBar'>
                                                                <div className='StatsFill' style={{width: `${selectedHero.powerstats?.strength}%`,
                                                             backgroundColor: getStatColor(selectedHero.powerstats?.strength)}}></div>
                                                            </div>
                                                            <span className='value'><strong> {selectedHero.powerstats?.strength || 'Unknown'}</strong></span>


                                                            <span>Speed </span>
                                                            <div className='StatsBar'>
                                                                <div className='StatsFill' style={{width: `${selectedHero.powerstats?.speed}%`,
                                                            backgroundColor: getStatColor(selectedHero.powerstats?.speed)}}></div>
                                                            </div>
                                                            <span className='value'><strong> {selectedHero.powerstats?.speed || 'Unknown'}</strong></span>

                                                            
                                                            <span>Durability </span>
                                                            <div className='StatsBar'>
                                                                <div className='StatsFill' style={{width: `${selectedHero.powerstats?.durability}%`,
                                                            backgroundColor: getStatColor(selectedHero.powerstats?.durability)}}></div>
                                                            </div>
                                                            <span className='value'><strong> {selectedHero.powerstats?.durability || 'Unknown'}</strong></span>


                                                            <span>Power </span>
                                                            <div className='StatsBar'>
                                                                <div className='StatsFill' style={{width: `${selectedHero.powerstats?.power}%`,
                                                            backgroundColor: getStatColor(selectedHero.powerstats?.power)}}></div>
                                                            </div>
                                                            <span className='value'><strong> {selectedHero.powerstats?.power || 'Unknown'}</strong></span>


                                                            <span>Combat </span>
                                                            <div className='StatsBar'>
                                                                <div className='StatsFill' style={{width: `${selectedHero.powerstats?.combat}%`,
                                                            backgroundColor: getStatColor(selectedHero.powerstats?.combat)}}></div>
                                                            </div>
                                                            <span className='value'><strong> {selectedHero.powerstats?.combat || 'Unknown'}</strong></span>
                                                        
                                                     </div>
                                                
                                                <h2 style={{ textDecoration: 'underline' }}>Appearance:</h2>
                                                <div className='Appearance'>
                                                    
                                                    <span>Gender -</span>
                                                    <span> {selectedHero.appearance?.gender || 'Unknown'}</span>

                                                    <span>Race -</span>
                                                    <span> {selectedHero.appearance?.race || 'Unknown'}</span>

                                                    <span>Height -</span>
                                                    <span> {selectedHero.appearance?.height[0] || 'Unknown'}</span>

                                                    <span>Weight -</span>
                                                    <span>{selectedHero.appearance?.weight[0] || 'Unknown'}</span>
                                                        
                                                        
                                                        
                                                    
                                                </div>
                                                
                                                <button onClick={CloseModal} className='CloseButton'>x</button>
                                                </div>
                                            </div>
                                                
                                        </div>
                                    </div>
                   )}

        </div>
    )
}
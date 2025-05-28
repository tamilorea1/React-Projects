import { useState } from 'react';
import React from 'react'
import {EXAMPLES} from '../data.js'
import TabButton from './TabButton.jsx';
import Section from './Section.jsx';

export default function Examples() {
    const [selectedTab, setSelectedTab] = useState()
    
       function handleClick(selectedButton){
        setSelectedTab(selectedButton)
        // console.log(selectedButton)
        }


  return (
    <Section title = 'Examples'  id='examples'>
          {/*The menu tag, forms a list of buttons. */}
          {/*We're assigning our component "TabButton" as such */}
            <menu>
              <TabButton isSelected = {selectedTab === 'components'} 
              onClick={() => handleClick('components')}>Components</TabButton>

              <TabButton isSelected = {selectedTab === 'jsx'}  
              onClick={() => handleClick('jsx')}>JSX</TabButton>

              <TabButton isSelected = {selectedTab === 'props'}  
              onClick={() => handleClick('props')}>Props</TabButton>

              <TabButton isSelected = {selectedTab === 'state'}  
              onClick={() => handleClick('state')}>State</TabButton>
            </menu>

              {!selectedTab ? <p>Please select a tab</p> : null}
              {selectedTab ? 
              <div id='tab-contents'>
              <h3>{EXAMPLES[selectedTab].title}</h3>
              <p>{EXAMPLES[selectedTab].description}</p>
              <pre>

                <code>
                  {EXAMPLES[selectedTab].code}
                </code>
              </pre>
            </div> : null} 
            
        </Section>
    
  )
}

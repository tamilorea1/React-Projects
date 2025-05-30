
import React from 'react'
import { calculateInvestmentResults, formatter } from '../util/investment'

export default function ResultsTable({userInput}) {
    //the function from our utility contains 4 arguments of an object
    //our userInput contains all 4 
  const investmentResults = calculateInvestmentResults(userInput)
//   console.log(investmentResults)

  const initialInvestment = investmentResults[0].valueEndOfYear - 
                            investmentResults[0].interest -
                            investmentResults[0].annualInvestment

  return (
        <table id='result'>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>

            <tbody>
                {/*We're mapping through each array that's displayed in our console */}
                {/*We assign a table of rows to display it */}
                {investmentResults.map((item) => 
                {
                    const totalInterest =
                        item.valueEndOfYear -
                        item.annualInvestment *
                        item.year -
                        initialInvestment;
                    
                    const totalAmountInvested =
                        item.valueEndOfYear - totalInterest;

                    return(
                        <tr key={item.year}>
                        <td>{item.year}</td>
                        <td>{formatter.format(item.valueEndOfYear)}</td>
                        <td>{formatter.format(item.interest)} </td>
                        <td>{formatter.format(totalInterest)} </td>
                        <td>{formatter.format(totalAmountInvested)} </td>
                    </tr>
                    )
                    
                })}
            </tbody>
            
            
        </table>
  )
}

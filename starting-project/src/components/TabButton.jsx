

export default function TabButton({children, isSelected, ...props}) {
    

    

  return (
    <li>
        {/* The children shows the content that is in between the component tags from the parent(App.jsx) */}
        <button className={isSelected ? 'active' : ''} {...props}>
            {children}
        </button>
        
    </li>
  )
}

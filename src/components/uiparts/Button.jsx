const Button = ({children}) => {
  return <>
    <button className={"bg-primary px-2 py-2 rounded-xl text-white"}>{children}</button>
  </>
}

export default Button
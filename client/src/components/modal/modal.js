export const Modal = ({children}) => {
  return <div className="fixed top-0 left-0 h-screen w-screen bg-black/70 backdrop-blur flex flex-col items-center justify-center space-y-5 ">{children}</div>
}
export default function LeftContainer() {
  return (
    <div className="relative z-10 flex flex-col  items-center px-10 text-center">
      <div className="mb-4 relative">
        <img
          src="/Primary-Logo-Tagline-Black.png"
          alt="Smart Vet Logo"
          className="h-40 bg-white  rounded-3xl"
        />
      </div>
      <div>
        <p className="text-lg xl:text-xl max-w-lg leading-relaxed drop-shadow-sm text-[#e65100]">
          Welcome to our new Online Health Centre! You are now able to connect
          with a Veterinarian via Message, Phone, or Video!
        </p>
      </div>
    </div>
  )
}

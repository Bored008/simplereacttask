export default function Footer() {
  return (
    <div className="text-center text-white p-2 border-slate-800 text-xl">
      <p>Mission Control Dashboard • Built with React</p>
      <p className="pt-1">
        Connect with me :
        <a
          className="pl-2"
          href="https://www.linkedin.com/in/himanshuakabored/"
        >
          <ion-icon name="logo-linkedin"></ion-icon>
        </a>
        <a className="pl-2" href="https://github.com/Bored008">
          <ion-icon name="logo-github"></ion-icon>
        </a>
        <a className="pl-2" href="https://t.me/BoRed_Xagain">
          <ion-icon name="paper-plane-outline"></ion-icon>
        </a>
      </p>
    </div>
  );
}

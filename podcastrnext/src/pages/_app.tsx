import { Header } from '../Components/Header';
import '../styles/global.scss';
// A página app é global, ela fica automaticamente em volta de todas as minhas páginas
import styles from '../styles/app.module.scss';
import { Player } from '../Components/Player';

// Na página App ficam as coisas que aparecem em todas as paginas de minha aplicação



function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
     <main>
     <Header/>
      <Component {...pageProps} />
     </main>
      <Player/>
    
    </div>
  );
}

export default MyApp


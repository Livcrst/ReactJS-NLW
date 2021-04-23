import { GetStaticProps } from "next";
import {format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Image from 'next/image';
import { api } from "../services/api";
import { convertDurationTimeToString } from "../utils/convertDurationTimeToString";
import styles from './home.module.scss';


type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  published_at: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
}
type HomeProps = {
  latesEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({latesEpisodes,allEpisodes}: HomeProps) {
  return (
    <div className = { styles.homepage}>
    <section className = { styles.latesEpisodes }>
      <h2> Ultimos Lançamentos </h2>

      <ul>
        {latesEpisodes.map(episode => {
          return ( 
          <li key={episode.id}>
            <Image 
                width={192}
                height={192}
                src={episode.thumbnail} 
                alt={episode.title}
                objectFit="cover"
              />


            <div className = { styles.Details }>
              <a href="">{episode.title}</a>
              <p> {episode.members}</p>
              <span>{episode.publishedAt}</span>
              <span>{episode.durationAsString}</span>
            </div>

            <button type='button'>
              <img src="/play-green.svg" alt="Tocar episódio"/>
            </button>
          </li>)
        })}
      </ul>

    </section>
    
    <section className = { styles.allEpisodes}>


    </section>
    </div>
  );
}


//SSG
export const getStaticProps: GetStaticProps = async () => {
  const {data} = await api.get('/episodes');

  const episodes = data.map(episode => {
    return { 
      id:episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at),'d MMM yy',{locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationTimeToString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })

  const latesEpisodes = episodes.slice(0,2);
  const allEpisodes = episodes.slice(2,episodes.length);

  return {
    props: {
      latesEpisodes,
      allEpisodes,
    },
    revalidate: 60*60*8, //Isso aqui serve para definir que a página será atualizada de 8 em 8 horas.
  }
}
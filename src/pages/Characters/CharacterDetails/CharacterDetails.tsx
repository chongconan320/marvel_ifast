import Comic from "component/Characters/Comic";
import { Fetching } from "component/General";
import useGet, { Status } from "hooks/useGet";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ICharacter } from "types/characters";
import styles from "./characterDetails.module.css";
import ImageNotFound from "assets/images/marvel_logo.svg";
import { ReactComponent as IconArrowLeft } from "assets/icons/arrow-left.svg";

const CharacterDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [character, status] = useGet<ICharacter>(`characters/${id}`);
  const src =
    character?.data.results[0].thumbnail.path +
    "." +
    character?.data.results[0].thumbnail.extension;
  const onNavigateBack = () => {
    navigate(-1);
  };
  return (
    <main className={styles["character-details"]}>
      {status === Status.idle && <Fetching />}
      {status === Status.complete && (
        <>
          <IconArrowLeft
            onClick={onNavigateBack}
            className={`${styles["character-details__icon"]} ${styles["character-details__icon--arrow-left"]} `}
          />
          <figure className={styles["character-details__thumbnail"]}>
            {src ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? (
              <img src={ImageNotFound} alt={character!.data.results[0].name} />
            ) : (
              <img
                src={
                  character!.data.results[0].thumbnail.path +
                  "." +
                  character!.data.results[0].thumbnail.extension
                }
                alt={character!.data.results[0].name}
              />
            )}

            <figcaption>{character!.data.results[0].name}</figcaption>
          </figure>
          <p className={styles["character-details__description"]}>
            {character!.data.results[0].description}
          </p>
          <div className={styles["comics-list"]}>
            <h2 className={styles["comics-list__title"]}>Comic List</h2>
            <ul className={styles["comic-list__list"]}>
              {character!.data.results[0].comics.items.map(
                ({ resourceURI, name }) => {
                  const id = resourceURI.slice(
                    resourceURI.indexOf("comics/") + "comics/".length
                  );
                  return (
                    <li key={id}>
                      <Link to={`/comics/${id}`}>
                        <Comic id={Number(id)} name={name} />
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </>
      )}
    </main>
  );
};
export default CharacterDetails;

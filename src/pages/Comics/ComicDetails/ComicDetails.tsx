import { Fetching } from "component/General";
import useGet, { Status } from "hooks/useGet";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./comicDetails.module.css";
import ImageNotFound from "assets/images/marvel_logo.svg";
import { ReactComponent as IconArrowLeft } from "assets/icons/arrow-left.svg";
import { Comics } from "types/comics";

const ComicDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comic, status] = useGet<Comics>(`comics/${id}`);

  const src =
    comic?.data.results[0].thumbnail.path +
    "." +
    comic?.data.results[0].thumbnail.extension;
  const onNavigateBack = () => {
    navigate(-1);
  };
  return (
    <main className={styles["comic-details"]}>
      {status === Status.idle && <Fetching />}
      {status === Status.complete && (
        <>
          <IconArrowLeft
            onClick={onNavigateBack}
            className={`${styles["comic-details__icon"]} ${styles["comic-details__icon--arrow-left"]} `}
          />
          <figure className={styles["comic-details__thumbnail"]}>
            {src ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? (
              <img src={ImageNotFound} alt={comic!.data.results[0].title} />
            ) : (
              <img
                src={
                  comic!.data.results[0].thumbnail.path +
                  "." +
                  comic!.data.results[0].thumbnail.extension
                }
                alt={comic!.data.results[0].title}
              />
            )}

            <figcaption>{comic!.data.results[0].title}</figcaption>
          </figure>
          <p>{comic!.data.results[0].description}</p>
        </>
      )}
    </main>
  );
};
export default ComicDetails;

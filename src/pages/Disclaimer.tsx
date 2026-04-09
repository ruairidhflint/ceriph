import { Link } from "react-router-dom";
import { disclaimerText } from "../constants/text";
import { PageContainer } from "../styles/SharedComponents";

export function Disclaimer() {
  return (
    <PageContainer>
      <div className="text">
        <p>{disclaimerText.paragraph1}</p>
        <p>{disclaimerText.paragraph2}</p>
        <p>
          {disclaimerText.paragraph3}
          <a
            href="https://en.wikipedia.org/wiki/Substitution_cipher"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Wikipedia.
          </a>
        </p>
      </div>
      <div className="return">
        <Link to="/" aria-label="Go back">
          {" "}
          ←
        </Link>
      </div>
    </PageContainer>
  );
}

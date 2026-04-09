import { Link } from "react-router-dom";
import { aboutText } from "../constants/text";
import { PageContainer } from "../styles/SharedComponents";

export function About() {
  return (
    <PageContainer>
      <div className="text">
        <p>{aboutText.paragraph1}</p>
        <p>{aboutText.paragraph2}</p>
        <p>
          Ceriph was built by{" "}
          <a
            href="https://roryflint.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rory Flint
          </a>{" "}
          during a series of one day build projects. Feel free to check out the
          source code{" "}
          <a
            href="https://github.com/ruairidhflint/ceriph"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{" "}
          or get in touch on{" "}
          <a
            href="https://twitter.com/MrRoryFlint"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          .
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

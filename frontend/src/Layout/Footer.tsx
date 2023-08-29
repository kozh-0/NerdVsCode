export default function Footer() {
  return (
    <footer>
      <div className="footer_inner">
        <a
          href="https://github.com/kozh-0/NerdVsCode"
          target="_blank"
          rel="noreferrer"
          className="center"
          style={{ justifyContent: "center" }}
        >
          <span>GitHub</span>
          <img
            src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
            alt="github"
            style={{ width: "30px" }}
          />
        </a>
      </div>
      <div style={{ marginTop: "5px" }}>NerdVsCode {new Date().getFullYear()}©</div>
    </footer>
  );
}

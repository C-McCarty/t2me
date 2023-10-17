import c from "../CSS/loader.module.css";

function LoadingScreen() {
    return(
        <div className={c.LoadingScreen}>
                <h2>Loading content, please wait...</h2>
                <div>
                    <div className={c.spinner}></div>
                </div>
        </div>
    );
}

export default LoadingScreen;
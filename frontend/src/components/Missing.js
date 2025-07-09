import React from 'react';
import '../css/Missing.css';

function Missing() {
  /* Credits to --> https://dev.to/webdeasy/25-creative-404-error-pages-with-cool-animations-16jn */
  return (
    <div className="error-container">
        <h2>Oops! Page Not Found</h2>
        <br />
      <div className="error-code">
        <pre>
          <code>
            <span className="green">&lt;!DOCTYPE html&gt;</span>
            <br />
            <span className="orange">&lt;html&gt;</span>
            <br />
            <span className="orange">&lt;style&gt;</span>
            <br />
            * {'{'}
            <br />
            &nbsp;&nbsp;<span className="green">everything</span>: <span className="blue">awesome</span>;
            <br />
            {'}'}
            <br />
            <span className="orange">&lt;/style&gt;</span>
            <br />
            <span className="orange">&lt;body&gt;</span>
            <br />
            &nbsp;&nbsp;ERROR 404!
            <br />
            &nbsp;&nbsp;FILE NOT FOUND!
            <br />
            <span className="comment">
              <pre>
              &lt;!-- The file you arelooking for is not where you think it <br/>
              is. --&gt;
              </pre>
            </span>
            <br />
            <span className="orange">&lt;/body&gt;</span>
            <br />
            <span className="orange">&lt;/html&gt;</span>
          </code>
        </pre>
      </div>
      <div className="error-message">
        <p>The page you’re looking for might have been removed, renamed, or is temporarily unavailable.</p>
        <a href="/" className="home-button">Go to Homepage</a>
      </div>
    </div>
  );
}

export default Missing;

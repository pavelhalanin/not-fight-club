class Error404Page {
  static render() {
    return `
      <div class="container">
        <div style="display: flex; flex-direction: column;">
          <h2>Error 404</h2>

          <div align="center">
            <img src="https://app.rs.school/static/svg/err.svg" alt="" style="max-width: 200px;" />
          </div>

          <p>Welcome to the 404 page! You are here because you entered the address of a page that no longer exists.</p>

          <p>Most likely, this happened for one of the following reasons:</p>

          <ul>
            <li>The page has been deleted (due to information becoming outdated);</li>
            <li>The page has been moved to another location;</li>
            <li>Perhaps you missed a letter when entering the address (honestly, this happens to us quite often too);</li>
            <li>You simply enjoy exploring 404 pages.</li>
          </ul>
        </div>
      </div>
    `;
  }
}

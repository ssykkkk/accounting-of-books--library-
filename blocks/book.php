<section class="books">
    <div class="add">
        <span>All books:</span>
        <button>New book</button>
    </div>
    <div class="panel">
        <div class="sort">
            <span>Sort by:</span>
            <select id="sortBook">
                <option value="name">name</option>
                <option value="author">author</option>
                <option value="quantity">quantity</option>
            </select>
        </div>
        <div class="search">
            <input type="text" placeholder="Search">
        </div>
    </div>
    <div class="allItems">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Year of publication</th>
                    <th>Name of the publishing house</th>
                    <th>Number of pages</th>
                    <th>Number of copies</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
    <div class="modalNew">
            <form class="wind" action="">
            <h3>New book</h3>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" required>
            </div>
            <div>
                <label for="auth">Author:</label>
                <input type="text" id="auth" required>
            </div>
            <div>
                <label for="year">Year:</label>
                <input type="number" id="year" required>
            </div>
            <div>
                <label for="nameP">NamePublic:</label>
                <input type="text" id="nameP" required>
            </div>
            <div>
                <label for="page">Pages:</label>
                <input type="number" id="page" required>
            </div>
            <div>
                <label for="copy">Copies:</label>
                <input type="number" id="copy" required> 
            </div>
            <button type="submit">add</button>
            </form>
    </div>
    <div class="modalEdit">
            <form class="wind" action="">
            <h3>Edit</h3>
            <div>
                <label for="nameE">Name:</label>
                <input type="text" id="nameE" required>
            </div>
            <div>
                <label for="authE">Author:</label>
                <input type="text" id="authE" required>
            </div>
            <div>
                <label for="yearE">Year:</label>
                <input type="number" id="yearE" required min="0">
            </div>
            <div>
                <label for="namePE">NamePublic:</label>
                <input type="text" id="namePE" required>
            </div>
            <div>
                <label for="pageE">Pages:</label>
                <input type="number" id="pageE" required min="0">
            </div>
            <div>
                <label for="copyE">Copies:</label>
                <input type="number" id="copyE" required min="0"> 
            </div>
            <div>
            <button class="save" type="submit">Save</button>
            <button class="delete"><img src="../img/bucket.png" alt=""></button>
            </div>
            </form>
    </div>
    <div class="modalExist">
        <div>
            <span>The book already exists</span>
        </div>
    </div>
</section>
<section class="visit">
    <div class="add">
        <span>All visitors:</span>
        <button>New visitor</button>
    </div>
    <div class="panel">
        <div class="sort">
            <span>Sort by:</span>
            <select id="sortVisit">
                <option value="id">id</option>
                <option value="name">name</option>
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
    <div class="modalNew">
        <form class="wind" action="">
            <h3>New visitor</h3>
            <div>
                <label for="nameVisit">Name:</label>
                <input type="text" id="nameVisit" required>
            </div>
            <div>
                <label for="phone">Phone:</label>
                <input type="number" id="phone" required>
            </div>
            <button type="submit">add</button>
        </form>
    </div>
    <div class="modalEdit">
        <form class="wind" action="">
            <h3>Edit</h3>
            <div>
                <label for="nameVisitE">Name:</label>
                <input type="text" id="nameVisitE" required>
            </div>
            <div>
                <label for="phoneVisitE">Phone:</label>
                <input type="number" id="phoneVisitE" required>
            </div>
            <div>
                <button class="save" type="submit">Save</button>
                <button class="delete"><img src="../img/bucket.png" alt=""></button>
            </div>
        </form>
    </div>
    <div class="modalExist">
        <div>
            <span>The visitor already exists</span>
        </div>
    </div>
</section>
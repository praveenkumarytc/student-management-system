const db = require("../utils/database_utils");

class School {

  // Create School
  static async create(data) {
    const { name, board, address, est_in = null } = data;

    const sql = `
      INSERT INTO schools
      (name, board, address, est_in, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(6), NOW(6))
    `;

    const [result] = await db.query(sql, [
      name,
      board,
      address,
      est_in
    ]);

    return result.insertId;
  }

  // Get All Schools
  static async findAll() {
    const sql = `
      SELECT * FROM schools
      ORDER BY created_at DESC
    `;

    const [rows] = await db.query(sql);
    return rows;
  }

  // Get School by ID
  static async findById(id) {
    const sql = `
      SELECT * FROM schools
      WHERE id = ?
    `;

    const [rows] = await db.query(sql, [id]);
    return rows[0];
  }

  // Update School
  static async update(id, data) {
    const { name, board, address, est_in } = data;

    const sql = `
      UPDATE schools
      SET name = ?,
          board = ?,
          address = ?,
          est_in = ?,
          updated_at = NOW(6)
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [
      name,
      board,
      address,
      est_in,
      id
    ]);

    return result.affectedRows;
  }

  // Hard Delete School
  static async delete(id) {
    const sql = `
      DELETE FROM schools
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [id]);
    return result.affectedRows;
  }

}

module.exports = School;
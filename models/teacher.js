const db = require("../utils/database_utils");

class Teacher {

  // Create Teacher
  static async create(data) {
    const { school_id, name = null, subject = null } = data;

    const sql = `
      INSERT INTO teachers
      (school_id, name, subject, created_at, updated_at)
      VALUES (?, ?, ?, NOW(6), NOW(6))
    `;

    const [result] = await db.query(sql, [
      school_id,
      name,
      subject
    ]);

    return result.insertId;
  }

  // Get All Teachers
  static async findAll() {
    const sql = `
      SELECT * FROM teachers
      ORDER BY created_at DESC
    `;

    const [rows] = await db.query(sql);
    return rows;
  }

  // Get Teachers by School
  static async findBySchool(school_id) {
    const sql = `
      SELECT * FROM teachers
      WHERE school_id = ?
      ORDER BY created_at DESC
    `;

    const [rows] = await db.query(sql, [school_id]);
    return rows;
  }

  // Get Teacher by ID
  static async findById(id) {
    const sql = `
      SELECT * FROM teachers
      WHERE id = ?
    `;

    const [rows] = await db.query(sql, [id]);
    return rows[0];
  }

  // Update Teacher
  static async update(id, data) {
    const { school_id, name, subject } = data;

    const sql = `
      UPDATE teachers
      SET school_id = ?,
          name = ?,
          subject = ?,
          updated_at = NOW(6)
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [
      school_id,
      name,
      subject,
      id
    ]);

    return result.affectedRows;
  }

  // Delete Teacher
  static async delete(id) {
    const sql = `
      DELETE FROM teachers
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [id]);
    return result.affectedRows;
  }

}

module.exports = Teacher;
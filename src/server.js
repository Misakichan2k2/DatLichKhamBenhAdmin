// server.js
const express = require('express');
const mysql = require('mysql');
const moment = require('moment');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const port = 3000;

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  '24544262210-fd1qv4jqnhrnfriijjp25lc2rl9kprgp.apps.googleusercontent.com',
  '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',
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: '1//04RlBTFULbEobCgYIARAAGAQSNwF-L9IrX76khIzigOK_UENkm0y5RTZlcHHXel-qf06htkTGhQesyfyyVwah60Vh75jJXcKsz6A'
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      type: 'OAUTH2',
      user: 'binh2210test@gmail.com',
      clientId: '24544262210-fd1qv4jqnhrnfriijjp25lc2rl9kprgp.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//04RlBTFULbEobCgYIARAAGAQSNwF-L9IrX76khIzigOK_UENkm0y5RTZlcHHXel-qf06htkTGhQesyfyyVwah60Vh75jJXcKsz6A',
      accessToken: accessToken,
  }
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dentalclinicdb'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/api/dailyRevenue', (req, res) => {
  const query = `
    SELECT DATE_FORMAT(NGAYKHAM, '%d-%m-%Y') AS Ngay, SUM(GIA) AS DoanhThu
    FROM appointment a
    JOIN service s ON a.MADV = s.MADV
    WHERE a.KHOATHANHTOAN = 2
    GROUP BY DATE_FORMAT(NGAYKHAM, '%d-%m-%Y')
    ORDER BY DATE_FORMAT(NGAYKHAM, '%Y-%m-%d') ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    }

    const data = {};

    if (results.length > 0) {
      results.forEach((row) => {
        data[row.Ngay] = row.DoanhThu;
      });
      res.json(data );
    } else {
      res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
    }
  });
});

app.get('/api/monthlyRevenue', (req, res) => {
    const query = `
      SELECT DATE_FORMAT(NGAYKHAM, '%m-%Y') AS Thang, SUM(GIA) AS DoanhThu
      FROM appointment a
      JOIN service s ON a.MADV = s.MADV
      WHERE a.KHOATHANHTOAN = 2
      GROUP BY DATE_FORMAT(NGAYKHAM, '%m-%Y')
      ORDER BY DATE_FORMAT(NGAYKHAM, '%Y-%m') ASC
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      }
  
      const data = {};
  
      if (results.length > 0) {
        results.forEach((row) => {
          data[row.Thang] = row.DoanhThu;
        });
        res.json(data);
      } else {
        res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
      }
    });
});

app.get('/getProfile', (req, res) => {
  const email = 'user@gmail.com'; // Replace with the logged-in user's email

  const sql = "SELECT * FROM khachhang WHERE EMAIL = ?";
  db.query(sql, [email], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }

    if (results.length > 0) {
      const row = results[0];
      const formattedDate = moment(row.NGAYSINH).format('DD/MM/YYYY');
      row.NGAYSINH = formattedDate;

      row.GIOITINH = row.GIOITINH.toString(); 

      res.json(row);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});


// app.get('/getProfile/:id', (req, res) => {
//   const customerID = req.params.id;

//   const sql = `SELECT * FROM khachhang WHERE MAKH = ?`;
//   db.query(sql, [customerID], (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
//     }

//     if (results.length > 0) {
//       const row = results[0];
//       const formattedDate = moment(row.NGAYSINH).format('DD/MM/YYYY');
//       row.NGAYSINH = formattedDate;

//       res.json(row);
//     } else {
//       res.status(404).json({ error: 'Không tìm thấy thông tin khách hàng' });
//     }
//   });
// });

app.post('/updateProfile/:id', (req, res) => {
  const customerID = req.params.id;
  const data = req.body;
  const birthDate = moment(data.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

  const sqlCheckChanges = 'SELECT * FROM khachhang WHERE MAKH = ?';
  db.query(sqlCheckChanges, [customerID], (error, resultCheckChanges) => {
    if (error) {
      return res.status(500).json({ error: 'Database error during checking changes', details: error });
    }

    if (resultCheckChanges.length > 0) {
      const rowBeforeUpdate = resultCheckChanges[0];
      const changedFields = [];

      if (rowBeforeUpdate.HOTEN !== data.name) {
        changedFields.push('HOTEN');
      }

      if (rowBeforeUpdate.EMAIL !== data.email) {
        changedFields.push('EMAIL');
      }

      if (rowBeforeUpdate.SDT !== data.phoneNumber) {
        changedFields.push('SDT');
      }

      if (rowBeforeUpdate.GIOITINH !== data.gender) {
        changedFields.push('GIOITINH');
      }

      if (rowBeforeUpdate.NGAYSINH !== birthDate) {
        changedFields.push('NGAYSINH');
      }

      if (rowBeforeUpdate.DIACHI !== data.address) {
        changedFields.push('DIACHI');
      }

      if (changedFields.length === 0) {
        return res.json({ success: true, message: 'No changes detected' });
      }

      const setStatements = changedFields.map(field => `${field} = ?`).join(', ');

      const sqlUpdate = `UPDATE khachhang SET ${setStatements} WHERE MAKH = ?`;
      const values = [...changedFields.map(field => data[field]), customerID];

      db.query(sqlUpdate, values, (updateError) => {
        if (updateError) {
          return res.status(500).json({ error: 'Error updating profile', details: updateError });
        }

        return res.json({ success: true, message: 'Profile updated' });
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

     
app.post('/changePassword/:MAKH', async (req, res) => {
  const MAKH = req.params.MAKH;
  const data = req.body;

  try {
    const fetchPasswordSql = 'SELECT PASSWORD FROM khachhang WHERE MAKH = ?';
    const [result] = await db.execute(fetchPasswordSql, [MAKH]);

    if (result.length > 0) {
      const currentStoredPassword = result[0].PASSWORD;
      const isPasswordMatch = await bcrypt.compare(data.currentPassword, currentStoredPassword);

      if (isPasswordMatch) {
        const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
        const updatePasswordSql = 'UPDATE khachhang SET PASSWORD = ? WHERE MAKH = ?';
        await db.execute(updatePasswordSql, [hashedNewPassword, MAKH]);

        return res.json({ success: true });
      } else {
        return res.status(400).json({ error: 'Incorrect current password' });
      }
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
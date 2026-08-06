import nodemailer from "nodemailer";

export const runtime = "nodejs";


// ===============================
// GMAIL SMTP
// ===============================

const createTransporter = () => {

  return nodemailer.createTransport({

    service: "gmail",

    auth: {

      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS,

    },

  });

};



// ===============================
// POST
// ===============================

export async function POST(req) {


  try {


    const body = await req.json();



    console.log("📩 Booking:", body);



    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {

      return Response.json({

        success:false,

        error:"Missing email config"

      });

    }



    const transporter = createTransporter();



    await transporter.sendMail({



      from:

      `"FPT Telecom Website" <${process.env.EMAIL_USER}>`,



      to:

      process.env.EMAIL_USER,



      subject:

      "📩 Khách hàng đăng ký tư vấn FPT Telecom",



      html:`


      <div

      style="
      font-family:Arial;
      padding:20px;
      color:#333;
      "

      >



      <h2>

      📩 Có khách hàng mới đăng ký

      </h2>



      <hr />



      <p>

      <b>👤 Họ tên:</b>

      ${body.name}

      </p>



      <p>

      <b>📞 Số điện thoại:</b>

      ${body.phone}

      </p>




      <p>

      <b>📌 Dịch vụ quan tâm:</b>

      </p>



      <ul>


      ${
        body.services && body.services.length

        ?

        body.services
        .map(
          item=>`

          <li>
          ${item}
          </li>

          `
        )
        .join("")

        :

        "<li>Không chọn dịch vụ</li>"

      }


      </ul>

    <p>
      <strong>📝 Ghi chú:</strong><br>
      ${
        body.message?.trim()
          ? body.message
              .replace(/\n/g, "<br>")
          : "<i>Không có ghi chú</i>"
      }
    </p>


      <hr />



      <p>

      Website FPT Telecom

      </p>



      </div>


      `


    });



    console.log("✅ Email sent");



    return Response.json({

      success:true

    });



  }

  catch(error){


    console.error(
      "❌ Mail error:",
      error
    );



    return Response.json({

      success:false,

      error:error.message

    });



  }


}
import nodeMailer from 'nodemailer';
import Bull from 'bull';


export const sendEmailJob = new Bull('send-email', { redis: { port: 6379 } });


// email template
const emailTemplate = (name) => {
    return `
      <h1>Hello ${name}!</h1>
      <p>Welcome to our newsletter!</p>
    `;
  };
  

sendEmailJob.process(async(job)=> {
    const { email, subject, name} = job.data;
    // send mail
    try {
        // send email logic
        const transporter = nodeMailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        })
    
        // 2. Configure email content
        const mailOption = {
            from:"riteshkumar411552@gmail.com",
            to:email,
            subject:subject,
            html:emailTemplate(name)
        }
    
        // 3. send mail
            const response = await transporter.sendMail(mailOption);
            console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email to ${email}: ${error}`);
    }
})
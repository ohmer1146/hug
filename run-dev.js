const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Starting Pool Villa application...');
console.log('📁 Project root:', __dirname);

// ฟังก์ชันสำหรับรันคำสั่งและแสดงผลลัพธ์
function runCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶️  Running: ${command} (in ${cwd})`);
    
    const childProcess = exec(command, { cwd });
    
    childProcess.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    
    childProcess.stderr.on('data', (data) => {
      console.error(`❌ ${data}`);
    });
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

// ฟังก์ชันหลักสำหรับเริ่มแอพพลิเคชัน
async function startApplication() {
  try {
    // รัน Backend Server
    console.log('\n🎯 Starting Backend Server...');
    const backendProcess = exec('npm run dev', { 
      cwd: path.join(__dirname, 'backend'),
      windowsHide: true 
    });

    backendProcess.stdout.on('data', (data) => {
      console.log(`🔷 Backend: ${data}`);
    });

    backendProcess.stderr.on('data', (data) => {
      console.error(`🔶 Backend Error: ${data}`);
    });

    // รอให้ backend เริ่มทำงานก่อน แล้วค่อยรัน frontend
    setTimeout(() => {
      console.log('\n🎯 Starting Frontend Server...');
      const frontendProcess = exec('npm start', { 
        cwd: path.join(__dirname, 'frontend'),
        windowsHide: true 
      });

      frontendProcess.stdout.on('data', (data) => {
        console.log(`🔹 Frontend: ${data}`);
      });

      frontendProcess.stderr.on('data', (data) => {
        console.error(`🔸 Frontend Error: ${data}`);
      });
    }, 5000);

    // จัดการการปิดแอพพลิเคชัน
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down servers...');
      backendProcess.kill();
      process.exit(0);
    });

  } catch (error) {
    console.error('💥 Failed to start application:', error);
    process.exit(1);
  }
}

// เริ่มต้นแอพพลิเคชัน
startApplication();
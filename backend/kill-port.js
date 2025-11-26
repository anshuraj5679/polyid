import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const PORT = process.env.PORT || 4001;

async function killPort() {
    console.log(`🔍 Checking for processes on port ${PORT}...`);
    
    try {
        if (process.platform === 'win32') {
            // Windows
            const { stdout } = await execAsync(`netstat -ano | findstr :${PORT}`);
            if (stdout) {
                console.log(`📋 Found process on port ${PORT}`);
                const lines = stdout.trim().split('\n');
                const pids = new Set();
                
                lines.forEach(line => {
                    const parts = line.trim().split(/\s+/);
                    const pid = parts[parts.length - 1];
                    if (pid && !isNaN(pid)) {
                        pids.add(pid);
                    }
                });
                
                for (const pid of pids) {
                    try {
                        await execAsync(`taskkill /PID ${pid} /F`);
                        console.log(`✅ Killed process ${pid}`);
                    } catch (err) {
                        console.log(`⚠️  Could not kill process ${pid}`);
                    }
                }
            } else {
                console.log(`✅ No process found on port ${PORT}`);
            }
        } else {
            // Mac/Linux
            try {
                const { stdout } = await execAsync(`lsof -ti:${PORT}`);
                if (stdout) {
                    const pids = stdout.trim().split('\n');
                    for (const pid of pids) {
                        await execAsync(`kill -9 ${pid}`);
                        console.log(`✅ Killed process ${pid}`);
                    }
                } else {
                    console.log(`✅ No process found on port ${PORT}`);
                }
            } catch (err) {
                if (err.code === 1) {
                    console.log(`✅ No process found on port ${PORT}`);
                } else {
                    throw err;
                }
            }
        }
        
        console.log(`\n✅ Port ${PORT} is now free!`);
        console.log(`💡 You can now run: npm start`);
        
    } catch (error) {
        console.error(`❌ Error:`, error.message);
        console.log(`\n💡 Manual steps:`);
        if (process.platform === 'win32') {
            console.log(`   1. netstat -ano | findstr :${PORT}`);
            console.log(`   2. taskkill /PID <PID> /F`);
        } else {
            console.log(`   1. lsof -ti:${PORT}`);
            console.log(`   2. kill -9 <PID>`);
        }
    }
}

killPort();

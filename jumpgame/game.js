class DinoGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // 游戏状态
        this.gameOver = false;
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('dinoHighScore')) || 0;

        // 游戏元素
        this.dino = {
            x: 50,
            y: this.height - 60,
            width: 40,
            height: 50,
            velocityY: 0,
            gravity: 0.8,
            jumpStrength: 15,
            isJumping: false
        };

        this.obstacles = [];
        this.obstacleSpeed = 5;
        this.obstacleFrequency = 100; // 帧数

        // 游戏循环
        this.frameCount = 0;
        this.animationId = null;

        this.init();
    }

    init() {
        document.getElementById('highScore').textContent = this.highScore;
        this.addEventListeners();
    }

    addEventListeners() {
        // 空格键跳跃
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.dino.isJumping) {
                this.dino.velocityY = -this.dino.jumpStrength;
                this.dino.isJumping = true;
            }
        });

        // 触摸/点击跳跃
        this.canvas.addEventListener('click', () => {
            if (!this.dino.isJumping) {
                this.dino.velocityY = -this.dino.jumpStrength;
                this.dino.isJumping = true;
            }
        });
    }

    start() {
        this.gameOver = false;
        this.score = 0;
        this.obstacles = [];
        this.frameCount = 0;
        document.getElementById('currentScore').textContent = this.score;

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        this.gameLoop();
    }

    gameLoop() {
        this.update();
        this.draw();

        if (!this.gameOver) {
            this.animationId = requestAnimationFrame(() => this.gameLoop());
        }
    }

    update() {
        this.frameCount++;

        // 更新恐龙位置
        this.dino.velocityY += this.dino.gravity;
        this.dino.y += this.dino.velocityY;

        // 检查是否落地
        if (this.dino.y >= this.height - 60) {
            this.dino.y = this.height - 60;
            this.dino.velocityY = 0;
            this.dino.isJumping = false;
        }

        // 生成障碍物
        if (this.frameCount % this.obstacleFrequency === 0) {
            this.generateObstacle();

            // 增加游戏难度
            if (this.obstacleSpeed < 12) {
                this.obstacleSpeed += 0.2;
            }
            if (this.obstacleFrequency > 50) {
                this.obstacleFrequency -= 0.5;
            }
        }

        // 更新障碍物
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            this.obstacles[i].x -= this.obstacleSpeed;

            // 移除屏幕外的障碍物并增加分数
            if (this.obstacles[i].x + this.obstacles[i].width < 0) {
                this.obstacles.splice(i, 1);
                this.score++;
                document.getElementById('currentScore').textContent = this.score;
            }

            // 碰撞检测
            if (this.checkCollision(this.dino, this.obstacles[i])) {
                this.gameOver = true;
                this.endGame();
                break;
            }
        }
    }

    draw() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 绘制地面
        this.ctx.fillStyle = '#666';
        this.ctx.fillRect(0, this.height - 10, this.width, 10);

        // 绘制恐龙
        this.ctx.fillStyle = '#28a745';
        this.ctx.fillRect(this.dino.x, this.dino.y, this.dino.width, this.dino.height);

        // 绘制障碍物
        this.ctx.fillStyle = '#dc3545';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });

        // 绘制分数
        this.ctx.fillStyle = '#333';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`分数: ${this.score}`, 20, 30);

        // 游戏结束提示
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = 'white';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('游戏结束!', this.width / 2, this.height / 2 - 30);
            this.ctx.font = '20px Arial';
            this.ctx.fillText(`最终分数: ${this.score}`, this.width / 2, this.height / 2 + 10);
            this.ctx.fillText('点击屏幕重新开始', this.width / 2, this.height / 2 + 50);
            this.ctx.textAlign = 'left';
        }
    }

    generateObstacle() {
        const height = 30 + Math.random() * 30;
        this.obstacles.push({
            x: this.width,
            y: this.height - 10 - height,
            width: 20,
            height: height
        });
    }

    checkCollision(dino, obstacle) {
        return dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y;
    }

    endGame() {
        // 更新最高分
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('dinoHighScore', this.highScore);
            document.getElementById('highScore').textContent = this.highScore;

            // 如果用户已登录，保存分数到用户数据
            if (window.userManager && window.userManager.currentUser) {
                window.userManager.updateHighScore(window.userManager.currentUser.id, this.score);
                updateUserInfo();
            }
        }

        // 更新排行榜
        updateLeaderboard();

        // 添加重新开始的事件监听
        this.canvas.onclick = () => this.start();
    }
}

// 初始化用户界面
function initUI() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // 切换登录/注册表单
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // 登录表单提交
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const result = window.userManager.login(username, password);
        if (result.success) {
            updateUserInfo();
            updateLeaderboard();
            alert('登录成功！');
        } else {
            alert(result.message);
        }
    });

    // 注册表单提交
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // 验证密码是否一致
        if (password !== confirmPassword) {
            document.getElementById('passwordError').style.display = 'block';
            return;
        }
        document.getElementById('passwordError').style.display = 'none';

        const result = window.userManager.register(username, password);
        if (result.success) {
            // 自动登录新注册的用户
            window.userManager.login(username, password);
            updateUserInfo();
            updateLeaderboard();
            alert('注册成功！');

            // 切换到登录表单
            loginTab.click();
        } else {
            document.getElementById('usernameError').style.display = 'block';
        }
    });

    // 退出登录
    logoutBtn.addEventListener('click', () => {
        window.userManager.logout();
        updateUserInfo();
        alert('已退出登录');
    });

    // 检查用户名是否已存在
    document.getElementById('registerUsername').addEventListener('input', (e) => {
        const username = e.target.value;
        const exists = window.userManager.users.some(user => user.username === username);
        document.getElementById('usernameError').style.display = exists ? 'block' : 'none';
    });

    // 检查密码是否一致
    document.getElementById('confirmPassword').addEventListener('input', (e) => {
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = e.target.value;
        document.getElementById('passwordError').style.display =
            (password !== confirmPassword) ? 'block' : 'none';
    });
}

// 更新用户信息显示
function updateUserInfo() {
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userHighScore = document.getElementById('userHighScore');
    const userAvatar = document.getElementById('userAvatar');
    const logoutBtn = document.getElementById('logoutBtn');
    const authBox = document.querySelector('.auth-box');

    if (window.userManager.currentUser) {
        const user = window.userManager.currentUser;
        userInfo.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
        authBox.classList.add('hidden');

        userName.textContent = user.username;
        userHighScore.textContent = user.highScore;
        userAvatar.textContent = user.username.charAt(0).toUpperCase();
    } else {
        userInfo.classList.add('hidden');
        logoutBtn.classList.add('hidden');
        authBox.classList.remove('hidden');
    }
}

// 更新排行榜显示
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    const leaderboard = window.userManager.getLeaderboard();

    leaderboardList.innerHTML = '';

    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<div class="leaderboard-item">暂无记录</div>';
        return;
    }

    leaderboard.forEach((user, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';

        item.innerHTML = `
                    <div class="leaderboard-rank">${index + 1}</div>
                    <div class="leaderboard-avatar">${user.username.charAt(0).toUpperCase()}</div>
                    <div class="leaderboard-info">
                        <div class="leaderboard-name">${user.username}</div>
                    </div>
                    <div class="leaderboard-score">${user.highScore}</div>
                `;

        leaderboardList.appendChild(item);
    });
}

// 页面加载完成后初始化
window.onload = function () {
    // 初始化用户管理器
    window.userManager = new UserManager();

    // 初始化UI
    initUI();

    // 初始化游戏
    window.game = new DinoGame('gameCanvas');

    // 更新用户信息和排行榜
    updateUserInfo();
    updateLeaderboard();

    // 开始游戏按钮
    document.getElementById('startBtn').addEventListener('click', () => {
        if (!window.userManager.currentUser) {
            alert('请先登录后再开始游戏');
            return;
        }
        window.game.start();
    });
};
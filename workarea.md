---
layout: default
title: 工地
---

# 这个区域主要用来测试和调试为个人主页开发的新功能和模块，不做展示用
# 以下内容仍在试用阶段，存在bug，可以忽略

施工中......

# 小游戏

<div class="container">
    <h1>🦖 小恐龙跳跃游戏</h1>
    <div class="user-section">
        <div id="userInfo" class="user-info hidden">
            <div class="avatar" id="userAvatar">U</div>
            <div>
                <div id="userName">用户</div>
                <div>最高分: <span id="userHighScore">0</span></div>
            </div>
        </div>
        <button id="logoutBtn" class="btn hidden">退出</button>
    </div>
    <div class="main-content">
            <section class="game-section">
                <canvas id="gameCanvas" width="800" height="400"></canvas>
                <div class="game-controls">
                    <div class="score-board">
                        <div class="score-item">
                            <div>当前分数</div>
                            <div class="score-value" id="currentScore">0</div>
                        </div>
                        <div class="score-item">
                            <div>最高分数</div>
                            <div class="score-value" id="highScore">0</div>
                        </div>
                    </div>
                    <button id="startBtn" class="btn">开始游戏</button>
                    <p class="instructions">按空格键或点击屏幕让恐龙跳跃</p>
                </div>
            </section>
            <aside class="sidebar">
                <div class="auth-box">
                    <div class="auth-tabs">
                        <div class="auth-tab active" id="loginTab">登录</div>
                        <div class="auth-tab" id="registerTab">注册</div>
                    </div>
                    <form id="loginForm" class="auth-form">
                        <div class="form-group">
                            <label for="loginUsername">昵称</label>
                            <input type="text" id="loginUsername" required>
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">密码</label>
                            <input type="password" id="loginPassword" required>
                        </div>
                        <button type="submit" class="btn">登录</button>
                    </form>
                    <form id="registerForm" class="auth-form hidden">
                        <div class="form-group">
                            <label for="registerUsername">昵称</label>
                            <input type="text" id="registerUsername" required>
                            <small id="usernameError" style="color: #ff4757; display: none;">昵称已存在</small>
                        </div>
                        <div class="form-group">
                            <label for="registerPassword">密码</label>
                            <input type="password" id="registerPassword" required>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">确认密码</label>
                            <input type="password" id="confirmPassword" required>
                            <small id="passwordError" style="color: #ff4757; display: none;">密码不一致</small>
                        </div>
                        <button type="submit" class="btn">注册</button>
                    </form>
                </div>
                <div class="leaderboard">
                    <h2>🏆 排行榜</h2>
                    <div class="leaderboard-list" id="leaderboardList">
                    </div>
                </div>
            </aside>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="jumpgame/auth.js"></script>
<script src="jumpgame/game.js"></script>

# 评论区
PS：评论之后，你的GitHub账号会在我的仓库的Issues模块留下评论，此时有可能会自动关注这条Issue，之后再有人有新的评论时，可能会向你GitHub账号的邮箱发送提醒。

如果你不想接收这一提醒，可以去到[我仓库的Issue界面](https://github.com/kuiningzzzz/kuiningzzzz.github.io/issues)，找到你评论所在区域对应的Issue，并点进去后在右下角的Notifications选项中取消掉Subscribe。

如果你想一劳永逸再也不自动订阅这一提醒，可以去你自己账号的Settings界面，点击左边Notifications，在右半Subscriptions中的Customize email updates中取消掉Comments on Issues选项并点击Save保存确定即可。

<script src="https://utteranc.es/client.js"
        repo="kuiningzzzz/kuiningzzzz.github.io"
        issue-term="pathname"
        label="Comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
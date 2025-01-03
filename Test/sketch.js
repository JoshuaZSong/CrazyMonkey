let bgX = 0;  // 背景的 X 坐标
let characterX = 100; // 角色的 X 坐标
let characterY = 300; // 角色的 Y 坐标

// 树的固定位置
let treeX = 600;
let treeY = 250;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);

  // 使用 push() 和 pop() 来确保背景和角色的平移影响范围
  push();  // 保存当前状态

  // 平移背景
  translate(bgX, 0); // 平移背景，bgX 控制背景的滚动

  // 绘制背景（比如一块大地或场景元素）
  fill(150, 200, 255);
  rect(0, 0, 1000, height); // 创建一个宽大的背景
  
  // 绘制地面（平台）
  fill(0, 255, 0);
  rect(0, height - 50, 1000, 50); // 地面
  
  // 绘制树（树和背景一起移动）
  drawTree(treeX, treeY);

  // 恢复背景的坐标系
  pop();  // 恢复之前的状态
  
  // 使用 push() 和 pop() 来确保角色的坐标系统不受背景平移影响
  push();  // 保存当前状态
  
  // 绘制角色时不受背景影响
  translate(characterX, characterY); // 角色的平移
  fill(255, 0, 0); // 角色的颜色
  ellipse(0, 0, 50, 50); // 角色是一个圆形
  
  // 恢复角色的坐标系统
  pop();  // 恢复之前的状态

  // 控制背景和角色的移动
  if (keyIsDown(LEFT_ARROW)) {
    bgX += 5; // 左移背景
    characterX -= 5; // 角色向左移动
  }
  if (keyIsDown(RIGHT_ARROW)) {
    bgX -= 5; // 右移背景
    characterX += 5; // 角色向右移动
  }
}

// 绘制树的函数
function drawTree(x, y) {
  fill(139, 69, 19); // 树干颜色
  rect(x, y - 50, 20, 50); // 树干
  
  fill(34, 139, 34); // 树叶颜色
  ellipse(x + 10, y - 70, 60, 60); // 树叶
}

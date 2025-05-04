let player = { name: '', img: '', hp: 0, damage: 0 };
let kuleDestroyed = 0;

function selectCharacter(name, img, hp, damage) {
  player = { name, img, hp, damage };
  document.getElementById('playerName').textContent = name;
  document.getElementById('hp').textContent = hp;
  document.getElementById('damage').textContent = damage;
  const char = document.getElementById('characterSprite');
  char.src = img;
  char.style.top = '200px';
  char.style.left = '200px';
  document.getElementById('characterSelect').style.display = 'none';
  document.getElementById('gameArea').style.display = 'block';
  if (name === "Sezar") enableUlti();
  else document.getElementById("ultiBtn").style.display = "none";
}

function useUlt() {
  if (player.name !== "Sezar") return;
  alert("🌀 Mammy ultisi kullanıldı!");
  player.damage += 5;
  document.getElementById('damage').textContent = player.damage;
  document.getElementById("ultiBtn").disabled = true;
  setTimeout(() => {
    document.getElementById("ultiBtn").disabled = false;
    player.damage -= 5;
    document.getElementById('damage').textContent = player.damage;
  }, 10000);
}
function enableUlti() {
  document.getElementById("ultiBtn").style.display = "inline-block";
}

document.addEventListener('keydown', (e) => {
  const speed = 10;
  let char = document.getElementById('characterSprite');
  let x = parseInt(char.style.left || '200');
  let y = parseInt(char.style.top || '200');
  if (e.key === 'w') y -= speed;
  if (e.key === 's') y += speed;
  if (e.key === 'a') x -= speed;
  if (e.key === 'd') x += speed;
  char.style.left = x + 'px';
  char.style.top = y + 'px';
  checkKuleCollision(x, y);
});

function checkKuleCollision(x, y) {
  let kuleler = document.querySelectorAll('.enemyKule');
  kuleler.forEach(kule => {
    const kx = parseInt(kule.style.left || '0');
    const ky = parseInt(kule.style.top || '0');
    if (Math.abs(kx - x) < 40 && Math.abs(ky - y) < 40) {
      let hp = parseInt(kule.dataset.hp);
      hp -= player.damage;
      kule.dataset.hp = hp;
      kule.nextElementSibling.textContent = "HP: " + hp;
      if (hp <= 0) {
        kule.nextElementSibling.remove();
        kule.remove();
        kuleDestroyed++;
        if (kuleDestroyed >= 3) alert("🎉 Kazandın! 3 kuleyi yok ettin!");
      }
    }
  });
}

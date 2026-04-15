// Tezro Adaptive Employment Logic
export const findJobMatch = (voiceInput, location) => {
  const skills = {
    driver: ['گاڑی', 'ڈرائیور', 'taxi', 'ride'],
    delivery: ['پارسل', 'ڈیلیوری', 'delivery', 'courier'],
    chef: ['کھانا', 'باورچی', 'chef', 'cooking'],
    security: ['سیکیورٹی', 'گارڈ', 'guard', 'security']
  };

  // آواز سے مہارت (Skill) نکالنا
  let matchedSkill = "general";
  Object.keys(skills).forEach(skill => {
    if (skills[skill].some(keyword => voiceInput.toLowerCase().includes(keyword))) {
      matchedSkill = skill;
    }
  });

  return {
    skill: matchedSkill,
    area: location,
    timestamp: new Date().toISOString()
  };
};

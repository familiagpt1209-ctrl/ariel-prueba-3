/**
 * Character adapter contract for replacing Ariel without touching game rules.
 * Game calls createAriel(renderer,equipped) -> { draw(root,state,time), dispose() }.
 * Units are meters, Y up, forward -Z. Feet on scooter at Y=.4, total height ~2.9.
 * root: column-major 4x4 transform, carries lane/jump/trick/crash.
 * state: {slide:seconds, powers:{drone,overclock,...}, jump, over, speed}.
 * Standard animation names for a rigged replacement:
 * Idle, Ride, Run, Jump, Slide, Trick, Hit, Fly.
 * Humanoid bone mapping: Hips, Spine, Chest, Neck, Head,
 * LeftUpperArm, LeftLowerArm, LeftHand, RightUpperArm, RightLowerArm, RightHand,
 * LeftUpperLeg, LeftLowerLeg, LeftFoot, RightUpperLeg, RightLowerLeg, RightFoot.
 * createAriel in world.js implements the adapter with separate articulated
 * head, torso, arms, legs, wheels, scooter and drone meshes. A rigged importer
 * should be contained in its own module exporting the same factory.
 */
export const ANIMATIONS=['Idle','Ride','Run','Jump','Slide','Trick','Hit','Fly'];
export function animationState(state){return state.over?'Hit':state.powers?.drone?'Fly':state.trick?'Trick':state.slide?'Slide':state.jump?'Jump':state.speed?'Ride':'Idle';}

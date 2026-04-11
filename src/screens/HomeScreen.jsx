
import React from 'react';

import Navbar from '../components/Navigation/Navbar';

import BottomNav from '../components/BottomNav';

import SuperSearchBar from '../components/SuperSearchBar';

import TezroVirtualCard from '../components/TezroVirtualCard';

import QuickActions from '../components/home/QuickActions';

import RideMap from '../components/RideMap'; // میپ کا کمپوننٹ

import CategorySlider from '../components/Marketplace/CategorySlider';



const HomeScreen = () => {

  return (

    <div className="min-h-screen bg-[#050505] text-white">

      <Navbar />

      

      <main className="px-4 pt-2 pb-32 space-y-6">

        {/* سرچ بار */}

        <SuperSearchBar />



        {/* کوئیک ایکشنز */}

        <QuickActions />



        {/* ورچوئل کارڈ */}

        <TezroVirtualCard />



        {/* میپ سیکشن (بلیک اور گولڈن تھیم کیلئے RideMap میں فلٹر ہونا ضروری ہے) */}

        <div className="rounded-[2rem] overflow-hidden border border-[#FFD700]/20 h-48 shadow-inner relative">

           <RideMap />

           <div className="absolute inset-0 pointer-events-none border-[10px] border-[#050505]/20"></div>

        </div>



        {/* ایکسپلور سیکشن */}

        <section>

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-[#FFD700] font-black uppercase tracking-[0.2em] text-[10px]">Explore Tezro Universe</h2>

            <button className="text-[8px] text-white/40 uppercase font-bold border-b border-white/20">View All</button>

          </div>

          <CategorySlider />

        </section>

      </main>



      <BottomNav />

    </div>

  );

};



export default HomeScreen;


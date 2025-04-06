import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 text-white rounded-3xl p-8 max-w-3xl mx-auto shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        
        <p className="text-gray-300 text-sm leading-relaxed">
          This app has been developed as part of a prototype project to demonstrate how 
          users can seamlessly track, compare, and execute their investments across 
          multiple platforms. The current version is for demo and educational purposes only, 
          and does not facilitate any real-time transactions. Any investment data shown is 
          either simulated or fetched through available public APIs and may not reflect actual 
          or updated market values. The AI-based recommendations and comparison tools 
          are designed to simplify complex financial decisions, but they do not constitute 
          professional financial advice. Users are advised to consult certified financial 
          advisors before making any real investment decisions. Personal or simulated data 
          shared by users is used strictly within the app environment for feature testing and 
          personalization, and will not be shared externally. All designs, features, and code 
          logic are the intellectual property of the project team and may not be reused, 
          copied, or distributed without written permission. As the app evolves, especially 
          with integration of live APIs in future phases, these terms will be updated to ensure 
          compliance, data security, and user privacy.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
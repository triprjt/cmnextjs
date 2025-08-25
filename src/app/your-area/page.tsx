'use client'
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useEffect, useState, Suspense } from "react";
import Select from 'react-select';
import axios from 'axios';

interface ConstituencyInfoType {
  area_name: string;
  vidhayak_info: {
    name: string;
    image_url: string;
    age: number;
    last_election_vote_percentage: string;
    experience: number;
    party_name: string;
    party_icon_url: string;
    manifesto_link: string;
    manifestore_score: number;
    metadata: {
      education: string;
      net_worth: string;
      criminal_cases: number;
      attendance: string;
      questions_asked: string;
      funds_utilisation: string;
    };
    survey_score: {
      question: string;
      yes_votes: number;
      no_votes: number;
      score: number;
    }[];
  };
  dept_info: {
    id: string;
    dept_name: string;
    work_info: string[];
    average_score: number;
    survey_score: {
      question: string;
      yes_votes: number;
      no_votes: number;
      score: number;
    }[];
  }[];
  other_candidates: {
    id: number;
    candidate_name: string;
    candidate_image_url: string;
    candidate_party: string;
    vote_share: string;
  }[];
  latest_news: Array<{
    title: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}
interface constituencyListType {
  _id: number;
  area_name: string;
}

// Create a wrapper component that uses useSearchParams
function YourAreaPageContent() {
  const router = useRouter();
  const [constituency, setConstituency] = useState<string | null>(null);
  const [constituencyInfo, setConstituencyInfo] = useState<ConstituencyInfoType | null>(null);
  const [loading, setLoading] = useState(false);
  const [constituencyButtonStates, setConstituencyButtonStates] = useState<{ [key: string]: 'yes' | 'no' }>({});
  const [selectedConstituency, setSelectedConstituency] = useState<constituencyListType | null>(null);
  const [constituencyAreaList, setConstituencyAreaList] = useState<constituencyListType[]>([]);
  const [deptRatings, setDeptRatings] = useState<{ [key: string]: number }>({});
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  // Get constituency from URL on client side
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const constituencyParam = urlParams.get('constituency');
    setConstituency(constituencyParam);
  }, []);

  useEffect(() => {
    const fetchConstituencyAreaList = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`/api/constituencies`);
        const data = response.data;
        setConstituencyAreaList(data);
      } catch (err) {
        setError('Failed to load constituencies');
      } finally {
        setLoading(false);
      }
    }

    fetchConstituencyAreaList();
  }, [backendUrl])

  const [error, setError] = useState<string | null>(null);

  const handleConstituencySelect = async (constituency: constituencyListType) => {
    setSelectedConstituency(constituency);
    setConstituency(constituency.area_name);
    router.push(`/your-area?constituency=${constituency.area_name}`);
  }
  useEffect(() => {
    if (constituency) {
      const fetchConstituencyInfo = async () => {
        setLoading(true);
        try {

          const response = await axios.get(`/api/constituencies/${constituency}`);
          setConstituencyInfo(response.data);
        } catch (err) {
          setError('Failed to fetch constituency information');
        } finally {
          setLoading(false);
        }
      }
      fetchConstituencyInfo();
    }
  }, [constituency]);

  if (!constituency) {
    return (
      <div className="h-[90vh] bg-[#c1cbd1] flex flex-col items-center my-auto align-middle justify-center">
        <div className="mb-8 max-w-md mx-auto">
          <Select
            placeholder="अपना निर्वाचन क्षेत्र खोजें..."
            value={selectedConstituency ? {
              value: selectedConstituency._id,
              label: selectedConstituency.area_name
            } : null}
            onChange={(option) => {
              if (option) {
                const constituency = constituencyAreaList.find(c => c._id === option.value);
                console.log('constituency123 ', constituency, 'option123 ', option);
                if (constituency) {
                  handleConstituencySelect(constituency);
                }
              }
            }}
            onMenuClose={() => {
              setSelectedConstituency(null);
            }}
            onMenuOpen={() => {
              setSelectedConstituency(null);
            }}
            options={constituencyAreaList.map(constituency => ({
              value: constituency._id,
              label: constituency.area_name
            }))}
            isSearchable={true}
            isClearable={true}
            className="text-gray-800"
            instanceId="constituency-select"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: '#e5e7eb',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                minHeight: 'auto'
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#6b7280'
              }),
              input: (provided) => ({
                ...provided,
                color: '#1f2937'
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#273F4F' : state.isFocused ? '#f3f4f6' : 'white',
                color: state.isSelected ? 'white' : '#1f2937',
                '&:hover': {
                  backgroundColor: state.isSelected ? '#273F4F' : '#f3f4f6'
                }
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 50
              })
            }}
          />
        </div>
        <div className="bg-[#f6f6f6] rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#273F4F] mb-2">कृपया निर्वाचन क्षेत्र चुनें</h2>
          <p className="text-gray-600 mb-4">देखने के लिए किसी निर्वाचन क्षेत्र का चयन करें</p>
          <button
            onClick={() => router.push('/')}
            className="bg-[#273F4F] text-white px-6 py-2 rounded-lg hover:bg-[#1e2f3a] transition-colors"
          >
            होम पेज पर जाएं
          </button>
        </div>
      </div>
    );
  }


  async function handlePollSubmit(constituencyAreaName: string, poll_category: string = 'vidhayak', poll_response: string, question_id: number, dept_id?: string) {
    try {

      setConstituencyButtonStates(prev => ({
        ...prev,
        [constituencyAreaName]: poll_response as 'yes' | 'no'
      }));
      const response = await axios.post(`/api/constituencies/poll/${constituencyAreaName}`, {
          poll_response: poll_response,
          poll_category: poll_category,
          question_id: question_id,
          dept_id: dept_id
      });
      const data = response.data;
      console.log('Poll submitted successfully', data);
    }
    catch (err) {
      console.error('Failed to submit poll:', err);
    }
    finally {
      console.log('Poll submitted successfully');
    }
  }
  const handleStarRatingPoll = async (deptId: string, rating: number) => {
    setDeptRatings(prev => ({
      ...prev,
      [deptId]: rating
    }));
    try {
      const response = await axios.post(`/api/constituencies/poll/${constituency}`, {
        poll_response: rating.toString(),
        poll_category: 'dept',
        question_id: 0,
        dept_id: deptId
      });
      const data = response.data;
      console.log('Star rating poll submitted successfully', data);
    } catch (err) {
      console.error('Failed to submit star rating poll:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#273F4F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading constituency information...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Not able to get data due to {error} </p>
        </div>
      </div>
    );
  }
  // Add these variables to get button states for this constituency
  const isYesSelected = constituencyButtonStates[constituencyInfo?.area_name || ''] === 'yes';
  const isNoSelected = constituencyButtonStates[constituencyInfo?.area_name || ''] === 'no';

  return (
    <div className="bg-[#c1cbd1]">
      {/* Main content */}
      <main className="px-4 py-2.5">
        <div className="space-y-2.5">
          <div className="max-w-md mx-auto">
            <Select
              placeholder="अपना निर्वाचन क्षेत्र खोजें..."
              value={selectedConstituency ? {
                value: selectedConstituency._id,
                label: selectedConstituency.area_name
              } : null}
              onChange={(option) => {
                if (option) {
                  const constituency = constituencyAreaList.find(c => c._id === option.value);
                  if (constituency) {
                    handleConstituencySelect(constituency);
                  }
                } else {
                  setConstituency(null);
                  setSelectedConstituency(null);
                  router.push('/your-area');
                }
              }}
              onMenuClose={() => {
                setSelectedConstituency(null);
              }}
              onMenuOpen={() => {
                setSelectedConstituency(null);
              }}
              options={constituencyAreaList.map(constituency => ({
                value: constituency._id,
                label: constituency.area_name
              }))}
              isSearchable={true}
              isClearable={true}
              className="text-gray-800"
              instanceId="constituency-select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#e5e7eb',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  minHeight: 'auto'
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#6b7280'
                }),
                input: (provided) => ({
                  ...provided,
                  color: '#1f2937'
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#273F4F' : state.isFocused ? '#f3f4f6' : 'white',
                  color: state.isSelected ? 'white' : '#1f2937',
                  '&:hover': {
                    backgroundColor: state.isSelected ? '#273F4F' : '#f3f4f6'
                  }
                }),
                clearIndicator: (provided) => ({
                  ...provided,
                  cursor: 'pointer',
                  padding: '6px',
                  color: '#6b7280',
                  '&:hover': {
                    color: '#1f2937'
                  }
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 50
                })
              }}
            />
          </div>
          {/* Constituency Information */}
          <div className="bg-[#f6f6f6] rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <p className=" mb-2 candidate-profile-main-heading-area-name">{constituencyInfo?.area_name}</p>
            <p className="text-gray-600">आपके क्षेत्र की जानकारी</p>
          </div>

          <div className="relative flex flex-col bg-[#f6f6f6] rounded-lg shadow-sm border border-gray-200 p-6 items-start space-x-3">
            {/* Profile Picture */}
            <div className="absolute top-0.5 right-[-10px] bg-[#D3DADF] px-4.5 py-1.5 rounded-md">
              <div className="text-center">
               <span
                  className="font-bold font-[Noto_Sans_Devanagari] text-[#273F4F]"
                  style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', fontWeight: 700, letterSpacing: '0' }}
                >
                  विधायक
                </span>
              </div>
            </div>
            <div className="flex items-start space-x-4 mt-4">
              <div className="w-20 h-20 aspect-square overflow-hidden flex-shrink-0">
                <img
                  src={constituencyInfo?.vidhayak_info.image_url}
                  alt={constituencyInfo?.vidhayak_info.name}
                  className="w-full h-full rounded-full object-cover border-2 border-gray-300"
                />
              </div>
              {/* <img
                src={constituencyInfo?.vidhayak_info.image_url}
                alt={constituencyInfo?.vidhayak_info.name}
                className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover opacity-100"
              /> */}
              {/* Candidate Info */}
              <div className="flex-1">
                <div className="candidate-profile-heading">
                  <span
                    className="font-bold text-xl text-[#1D2530] block"
                    style={{
                      fontFamily: 'Noto Sans Devanagari, sans-serif',
                      fontWeight: 700,
                      letterSpacing: '0'
                    }}
                  >
                    {constituencyInfo?.vidhayak_info.name}
                  </span>
                </div>
                <div
                  className="font-normal text-base text-[#7B899D] candidate-profile-subheading"
                  style={{
                    fontFamily: 'Noto Sans Devanagari',
                    fontWeight: 500,
                    letterSpacing: '0',
                  }}
                >
                  उम्र: {constituencyInfo?.vidhayak_info.age} वर्ष
                </div>
                {/* Party Button */}
                <div className="flex items-center gap-2 mb-2 mt-2 -ml-1">
                  <button className="bg-[#008040] text-white px-2.5 py-1.5 rounded-full text-sm font-medium whitespace-normal min-w-fit max-w-[200px]"
                  style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0' }}
                  >
                    {constituencyInfo?.vidhayak_info.party_name}
                  </button>
                  <div className="w-12 h-12 bg-[#f6f6f6] rounded-full flex-shrink-0 flex items-center justify-center p-2">
                    <img
                      src={constituencyInfo?.vidhayak_info.party_icon_url}
                      alt={constituencyInfo?.vidhayak_info.party_name}
                      className="w-full h-full rounded-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-between w-full">
              <p className=" mt-1 bg-[#E2EBF3] my-auto rounded-lg px-3 py-1 font-semibold text-9xl candidate-profile-subheading-text-last-election"
              style={{ fontFamily: 'Noto Sans Devanagari', fontWeight: 600,letterSpacing: '0',color: '#303D50' }}
              >अंतिम चुनाव: {constituencyInfo?.vidhayak_info.last_election_vote_percentage} वोट शेयर</p>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">{constituencyInfo?.vidhayak_info.experience}</p>
                <p className="candidate-profile-subheading-text-experience">बार निर्वाचित</p>
              </div>

            </div>

          </div>

          {/* Public Satisfaction Poll */}
          <div className="relative flex flex-col bg-[#f6f6f6] rounded-lg shadow-sm border border-gray-200 p-6 items-start space-x-3">
            <div className="text-lg leading-7 font-semibold text-center mx-auto mb-3"
              style={{ 
                fontFamily: 'Noto Sans Devanagari, sans-serif',
                fontWeight: 600,
                letterSpacing: '0',
                color: '#1D2530',
                lineHeight: '1.75rem'
              }}>
              {constituencyInfo?.vidhayak_info.survey_score && constituencyInfo?.vidhayak_info.survey_score.length > 0
                ? constituencyInfo?.vidhayak_info.survey_score[0].question
                : 'क्या आप पिछले पाँच साल के कार्यकाल से संतुष्ट है?'}
            </div>

            <div className="flex items-center justify-between w-full">
              {/* Response Buttons */}
              <div className="flex bg-[#f6f6f6] w-[90px] h-[40px] pt-[3px] pb-[10px] pr-[6px] pl-[3px] rounded-full shadow-xl gap-0">
                <button
                  className={`text-center w-[40px]  h-[34px] pl-[10px] pr-[10px] rounded-full text-base font-medium mx-auto transition-colors ${isYesSelected
                    ? 'bg-[#004030] text-white'
                    : 'bg-[#f6f6f6] text-[#026A00]'
                    }`}
                  onClick={() => constituencyInfo?.area_name && handlePollSubmit(constituencyInfo.area_name, 'vidhayak', 'yes', 0)}
                >
                  हाँ
                </button>
                <button
                  className={`text-center w-[40px] h-[34px] rounded-full text-base pr-[9px] pl-[3px] font-medium transition-colors ${isNoSelected
                    ? 'bg-[#CA3C26] text-white'
                    : 'bg-[#f6f6f6] text-[#026A00]'
                    }`}
                  onClick={() => constituencyInfo?.area_name && handlePollSubmit(constituencyInfo.area_name, 'vidhayak', 'no', 0)}
                >
                  ना
                </button>
              </div>

              {/* Satisfaction Percentage */}
              {isYesSelected || isNoSelected ? <div className="text-2xl font-bold text-green-600 candidate-profile-percentage-text flex flex-col">
                <span className="candidate-profile-percentage-text-subheading text-center my-1 text-xl">जनता की संतुष्टि</span>
                <span className="text-center">
                  {constituencyInfo?.vidhayak_info.survey_score && constituencyInfo?.vidhayak_info.survey_score.length > 0
                    ? `${constituencyInfo?.vidhayak_info.survey_score[0].score}%`
                    : '78%'}
                </span>

              </div> : null}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {constituencyInfo?.vidhayak_info.metadata && Object.keys(constituencyInfo.vidhayak_info.metadata).map((key, index) => {
              const iconMap: { [key: string]: { iconSrc: string; bgColor: string; label: string } } = {
                education: {
                  iconSrc: '/your_area_vectors/education.svg',
                  bgColor: 'bg-blue-100',
                  label: 'शिक्षा स्तर'
                },
                net_worth: {
                  iconSrc: '/your_area_vectors/asset.svg',
                  bgColor: 'bg-green-100',
                  label: 'संपत्ति'
                },
                criminal_cases: {
                  iconSrc: '/your_area_vectors/svg.svg',
                  bgColor: 'bg-red-100',
                  label: 'आपराधिक मामले'
                },
                attendance: {
                  iconSrc: '/your_area_vectors/upastithi.svg',
                  bgColor: 'bg-purple-100',
                  label: 'विधानसभा उपस्थिति'
                },
                questions_asked: {
                  iconSrc: '/your_area_vectors/questions.svg',
                  bgColor: 'bg-orange-100',
                  label: 'सवाल पूछे'
                },
                funds_utilisation: {
                  iconSrc: '/your_area_vectors/nidhi.svg',
                  bgColor: 'bg-green-100',
                  label: 'निधि उपयोग'
                }
              };

              const iconInfo = iconMap[key];
              const value = constituencyInfo.vidhayak_info.metadata[key as keyof typeof constituencyInfo.vidhayak_info.metadata];
              
              return (
                <div key={key} className="bg-[#f6f6f6] rounded-lg shadow-sm border border-gray-200 p-4 relative">
                  <div className={`w-6 h-7 rounded-lg absolute top-1.5 left-1.5 flex items-center justify-center`}>
                    <img 
                      src={iconInfo.iconSrc}
                      alt={iconInfo.label}
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="ml-5">
                    <p className="mt-2 text-base mb-1 text-center text-[#1D2530]" style={{ 
                      fontFamily: 'Noto Sans Devanagari',
                      fontWeight: 600,
                      letterSpacing: '0'
                    }}>{iconInfo.label}</p>
                    <p className="text-lg text-center font-semibold"
                    style={{ 
                          fontFamily: 'Noto Sans Devanagari, sans-serif',
                          fontWeight: 700,
                          letterSpacing: '0',
                          color: '#176DCF'
                        }}
                       >{value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>


          {/* Thematic Sections */}
          <div className="space-y-2.5">
            {constituencyInfo?.dept_info.map((dept) => {
              const iconMap: { [key: string]: { icon: string; bgColor: string; iconColor: string } } = {
                'स्वास्थ्य': {
                  icon: '/work_info/health.svg',
                  bgColor: 'bg-red-100',
                  iconColor: 'text-red-600'
                },
                'शिक्षा': {
                  icon: '/work_info/edu.svg',
                  bgColor: 'bg-blue-100',
                  iconColor: 'text-blue-600'
                },
                'महिला सशक्तिकरण': {
                  icon: '/work_info/misc.svg',
                  bgColor: 'bg-purple-100',
                  iconColor: 'text-purple-600'
                },
                'कृषि': {
                  icon: '/work_info/agri.svg',
                  bgColor: 'bg-yellow-100',
                  iconColor: 'text-yellow-600'
                },
                'रोजगार': {
                  icon: '/work_info/misc.svg',
                  bgColor: 'bg-yellow-100',
                  iconColor: 'text-yellow-600'
                }
              };

              const iconInfo = iconMap[dept.dept_name] || { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', bgColor: 'bg-gray-100', iconColor: 'text-gray-600' };
              const satisfactionPercentage = dept.survey_score[0].score

              return (
                <div key={dept.id} className="bg-[#f6f6f6] rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <img 
                        src={iconInfo.icon}
                        alt={dept.dept_name}
                        className="w-8 h-8"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-[#273F4F]">{dept.dept_name}</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    {dept.work_info && Array.isArray(dept.work_info) ? (dept.work_info.length > 0 && dept.work_info.map((work, index) => (
                      <p key={index} className="text-sm text-justify" style={{
                        fontFamily: 'Noto Sans Devanagari, sans-serif',
                        fontWeight: 400,
                        lineHeight: '1.625', // 22.75px/14px ≈ 1.625
                        letterSpacing: '0',
                        color: '#7B899D'
                      }}>{work}</p>
                    ))) : <p className="text-sm text-justify" style={{
                      fontFamily: 'Noto Sans Devanagari, sans-serif',
                      fontWeight: 400,
                      lineHeight: '1.625',
                      letterSpacing: '0',
                      color: '#7B899D'
                    }}>{dept.work_info}</p>}
                  </div>
                  <p className="text-base text-justify mb-2" style={{
                      fontFamily: 'Noto Sans Devanagari, sans-serif',
                      fontWeight: 550,
                      letterSpacing: '0',
                      color: '#1D2530'
                    }}>{dept.survey_score[0]?.question}</p>
                  {/* call handlePollSubmit when user clicks on the stars*/}
                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarRatingPoll(dept.id, star)}
                        className="hover:scale-110 transition-transform cursor-pointer"
                      >
                        <svg
                          className={`w-5 h-5 ${star <= (deptRatings[dept.id] || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"

                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between rounded-lg gap-10">
                    <div className="flex gap-1">
                      <p className="text-sm text-gray-600 mb-2 my-auto align-middle">{satisfactionPercentage}% </p>
                      <span className=" text-gray-400 candidate-profile-subheading-text-satisfaction-percentage align-middle my-auto">लोग इस विषय से संतुष्ट हैं</span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 flex flex-col">
                      <div className="flex gap-2">
                        <span className="candidate-profile-subheading-text-satisfaction-percentage-verygood">बहुत खराब</span>
                        <svg key={'star'} className={`w-2 h-2 text-yellow-400 my-auto`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg></div>
                      <div className="flex gap-2">
                        <span className="candidate-profile-subheading-text-satisfaction-percentage-verygood w-full">बहुत अच्छा</span>
                        <div className="flex align-middle my-auto">{[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`w-2 h-2 text-yellow-400`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}</div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Other Major Candidates */}
          <div className="bg-[#f6f6f6] rounded-lg shadow-sm border border-gray-200 px-3 py-3">
            <h3 
              className="text-xl mb-1"
              style={{
                fontFamily: 'Noto Sans Devanagari, sans-serif',
                fontWeight: 600,
                letterSpacing: '0',
                color: '#1D2530'
              }}
            >
              अन्य प्रमुख उम्मीदवार
            </h3>
            <p className="text-sm text-gray-600 mb-4">(पिछला चुनाव)</p>
            
            {/* <div className="flex space-x-10 overflow-x-auto pb-4">
              {constituencyInfo?.other_candidates.map((candidate) => (
                <div key={candidate.id} className="flex-shrink-0 w-32 text-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <img
                      src={candidate.candidate_image_url}
                      alt={candidate.candidate_name}
                      className="w-full h-full rounded-full object-cover border-2 border-gray-300"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-[#273F4F]">{candidate.candidate_name}</h4>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                      <img
                        src={partyIconMap[candidate.candidate_party as keyof typeof partyIconMap] || '/default-party-icon.png'}
                        alt={candidate.candidate_party}
                        className="w-4 h-4 rounded object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-600">{candidate.candidate_party}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">वोट शेयर: {candidate.vote_share}</p>
                </div>
              ))}
            </div> */}

            <div className="relative">
              <div className="grid grid-cols-2 gap-4 pb-4 px-1">
                {constituencyInfo?.other_candidates
                  ?.slice(currentCandidateIndex, currentCandidateIndex + 2)
                  .map((candidate) => (
                    <div key={candidate.id} className="bg-[#f6f6f6] rounded-lg shadow-md p-4 border border-gray-100 flex flex-col items-center">
                      <div className="w-20 h-20 bg-gray-300 rounded-full mb-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={candidate.candidate_image_url}
                          alt={candidate.candidate_name}
                          className="w-full h-full rounded-full object-cover border-2 border-gray-300"
                        />
                      </div>
                      <h4 
                        className="text-base mb-1 text-[#1D2530]"
                        style={{
                          fontFamily: 'Noto Sans Devanagari, sans-serif',
                          fontWeight: 600,
                          lineHeight: '1.625', // 26px/16px = 1.625
                          letterSpacing: '0'
                        }}
                      >{candidate.candidate_name}</h4>
                      {/* <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                          <img
                            src={partyIconMap[candidate.candidate_party as keyof typeof partyIconMap] || '/default-party-icon.png'}
                            alt={candidate.candidate_party}
                            className="w-4 h-4 rounded object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-600">{candidate.candidate_party}</span>
                      </div> */}
                      <div className="flex items-center gap-2 mb-2 -ml-1">
                        <button className="bg-[#008040] items-center text-white px-2.5 py-1.5 rounded-full text-xs font-medium whitespace-normal min-w-fit max-w-[200px]"
                        style={{ 
                          fontFamily: 'Noto Sans Devanagari, sans-serif',
                          fontWeight: 600,
                          letterSpacing: '0',
                          lineHeight: '1.625'
                        }}
                        >
                          {candidate.candidate_party}
                        </button>
                        {/* <div className="w-12 h-12 bg-[#f6f6f6] rounded-full flex-shrink-0 flex items-center justify-center">
                          <img
                            src={partyIconMap[candidate.candidate_party as keyof typeof partyIconMap] || '/default-party-icon.png'}
                            alt={candidate.candidate_party}
                            className="w-10 h-10 rounded object-contain"
                          />
                        </div> */}
                      </div>
                      <p className="text-xs text-gray-500 font-semibold">वोट शेयर: {candidate.vote_share}</p>
                    </div>
                  ))}
              </div>
              {/* Navigation Arrows */}
              <div className="absolute right-0 -top-15 flex justify-between pointer-events-none">
                {/* Left Arrow - Show only if not on first page */}
                {currentCandidateIndex > 0 && (
                  <div 
                    className="pointer-events-auto bg-[#f6f6f6] rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-50 transition-colors ml-1"
                    onClick={() => setCurrentCandidateIndex(prev => Math.max(0, prev - 2))}
                  >
                    <svg className="w-6 h-6 text-[#273F4F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                )}
                {/* Right Arrow - Show only if there are more candidates */}
                {constituencyInfo?.other_candidates && currentCandidateIndex + 2 < constituencyInfo.other_candidates.length && (
                  <div 
                    className="pointer-events-auto bg-[#f6f6f6] rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-50 transition-colors mr-1"
                    onClick={() => setCurrentCandidateIndex(prev => Math.min((prev + 2), (constituencyInfo.other_candidates.length || 0) - 2))}
                  >
                    <svg className="w-6 h-6 text-[#273F4F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-center space-x-3" onClick={() => router.push('/message')}>
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            <span className="text-white text-sm">आपके क्षेत्र के चर्चा मंच पर जाएं</span>
          </div>
        </div>
      </main>
    </div>
  )
}

// Main component with Suspense boundary
export default function YourAreaPage() {
  return (
    <div className="min-h-screen bg-[#c1cbd1] flex flex-col">
      <div className="flex-grow">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#273F4F] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        }>
          <YourAreaPageContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
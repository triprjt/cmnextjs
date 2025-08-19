'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Select from 'react-select';

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
      questions_asked: number;
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
        const response = await fetch(`${backendUrl}/api/constituencies`);
        const data = await response.json();
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
  const partyIconMap = {
    'BJP': 'https://blog-meme.blr1.digitaloceanspaces.com/charchamanchpartyimage1.png',
    'INC': 'https://blog-meme.blr1.digitaloceanspaces.com/charchamanchpartyimage2.png',
    'Congress': 'https://blog-meme.blr1.digitaloceanspaces.com/charchamanchpartyimage2.png',
    'AAP': 'https://blog-meme.blr1.digitaloceanspaces.com/charchamanchpartyimage1.png',
    'SP': 'https://blog-meme.blr1.digitaloceanspaces.com/charchamanchpartyimage2.png',
    'BSP': 'https://blog-meme.blr1.digitaloceanspaces.com/charchamanchpartyimage1.png',
    'JDU': 'https://blog-meme.blr1.digitaloceanspaces.com/charchamanchpartyimage2.png',
  }
  
  const handleConstituencySelect = async (constituency: constituencyListType) => {
    setSelectedConstituency(constituency);
    router.push(`/your-area?constituency=${constituency.area_name}`);
  }
  useEffect(() => {
    if (constituency) {
      const fetchConstituencyInfo = async () => {
        setLoading(true);
        try {

          const response = await fetch(`${backendUrl}/api/constituencies/${constituency}`);
          setConstituencyInfo(await response.json());
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
      <div className="h-[90vh] bg-[#939cab] flex flex-col items-center my-auto align-middle justify-center">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md mx-4">
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
      const response = await fetch(`${backendUrl}/api/constituencies/poll/${constituencyAreaName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Add this header
        },
        body: JSON.stringify({
          poll_response: poll_response,
          poll_category: poll_category,
          question_id: question_id,
          dept_id: dept_id
        })
      })
      const data = await response.json();
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
      const response = await fetch(`${backendUrl}/api/constituencies/poll/${constituency}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          poll_response: rating.toString(),
          poll_category: 'dept',
          question_id: 0,
          dept_id: deptId
        })
      });

      const data = await response.json();
      console.log('Star rating poll submitted successfully');
    } catch (err) {
      console.error('Failed to submit star rating poll:', err);
    }
  };
  console.log(constituency);
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
    <div className="min-h-screen bg-[#939cab]">

      {/* Main content */}
      <main className="px-4 py-6">
        <div className="space-y-6">
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
          {/* Constituency Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <p className=" mb-2 candidate-profile-main-heading-area-name">{constituencyInfo?.area_name}</p>
            <p className="text-gray-600">आपके क्षेत्र की जानकारी</p>
          </div>

          <div className="mb-4 relative flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 p-6 items-start space-x-3">
            {/* Profile Picture */}
            <div className="absolute top-1 right-1 bg-[#D3DADF] px-3 py-1 rounded-full">
              <div className="text-center">
                <div className="candidate-profile-vidhayak-text">विधायक</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={constituencyInfo?.vidhayak_info.image_url}
                alt={constituencyInfo?.vidhayak_info.name}
                className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
              />
              {/* Candidate Info */}
              <div className="flex-1">
                <div className="mb-1 candidate-profile-heading">
                  {constituencyInfo?.vidhayak_info.name}
                </div>
                <div className="text-xl font-bold candidate-profile-subheading ">
                  उम्र: {constituencyInfo?.vidhayak_info.age} वर्ष
                </div>

                {/* Party Button */}
                <div className="flex items-center space-x-2 mb-2">
                  <button className="bg-[#008040] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {constituencyInfo?.vidhayak_info.party_name}
                  </button>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center ml-26 ">
                    <img
                      src={constituencyInfo?.vidhayak_info.party_icon_url}
                      alt={constituencyInfo?.vidhayak_info.party_name}
                      className="w-6 h-6 rounded object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <p className=" mt-1 bg-[#E2EBF3] my-auto rounded-lg px-3 py-1 candidate-profile-subheading-text-last-election">अंतिम चुनाव: {constituencyInfo?.vidhayak_info.last_election_vote_percentage} वोट</p>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">{constituencyInfo?.vidhayak_info.experience} वर्ष </p>
                <p className="candidate-profile-subheading-text-experience">पद अनुभव</p>
              </div>

            </div>

          </div>

          {/* Public Satisfaction Poll */}
          <div className="mb-4 relative flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 p-6 items-start space-x-3">
            <div className="text-sm text-gray-600 mb-3 text-center  mx-auto">
              {constituencyInfo?.vidhayak_info.survey_score && constituencyInfo?.vidhayak_info.survey_score.length > 0
                ? constituencyInfo?.vidhayak_info.survey_score[0].question
                : 'क्या आप पिछले पाँच साल के कार्यकाल से संतुष्ट है?'}
            </div>

            <div className="flex items-center justify-between w-full">
              {/* Response Buttons */}
              <div className="flex bg-white w-[75px] h-[40px] pt-[3px] pb-[10px] pr-[6px] pl-[3px] rounded-full shadow-xl gap-0">
                <button
                  className={`text-center w-[30px]  h-[34px] pl-[10px] pr-[10px] rounded-full text-sm font-medium mx-auto transition-colors ${isYesSelected
                    ? 'bg-[#004030] text-white'
                    : 'bg-white text-[#026A00]'
                    }`}
                  onClick={() => constituencyInfo?.area_name && handlePollSubmit(constituencyInfo.area_name, 'vidhayak', 'yes', 0)}
                >
                  हाँ
                </button>
                <button
                  className={`text-center w-[30px] h-[34px] rounded-full text-sm pr-[9px] pl-[3px] font-medium transition-colors ${isNoSelected
                    ? 'bg-[#CA3C26] text-white'
                    : 'bg-white text-[#026A00]'
                    }`}
                  onClick={() => constituencyInfo?.area_name && handlePollSubmit(constituencyInfo.area_name, 'vidhayak', 'no', 0)}
                >
                  ना
                </button>
              </div>

              {/* Satisfaction Percentage */}
              {isYesSelected || isNoSelected ? <div className="text-2xl font-bold text-green-600 candidate-profile-percentage-text flex flex-col">
                <span className="candidate-profile-percentage-text-subheading text-center my-1">जनता की संतुष्टि</span>
                <span className="text-center">
                  {constituencyInfo?.vidhayak_info.survey_score && constituencyInfo?.vidhayak_info.survey_score.length > 0
                    ? `${constituencyInfo?.vidhayak_info.survey_score[0].score}%`
                    : '78%'}
                </span>

              </div> : null}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {constituencyInfo?.vidhayak_info.metadata && Object.keys(constituencyInfo.vidhayak_info.metadata).map((key, index) => {
              const iconMap: { [key: string]: { icon: string; bgColor: string; iconColor: string; label: string } } = {
                education: {
                  icon: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
                  bgColor: 'bg-blue-100',
                  iconColor: 'text-blue-600',
                  label: 'शिक्षा स्तर'
                },
                net_worth: {
                  icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
                  bgColor: 'bg-green-100',
                  iconColor: 'text-green-600',
                  label: 'संपत्ति'
                },
                criminal_cases: {
                  icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
                  bgColor: 'bg-red-100',
                  iconColor: 'text-red-600',
                  label: 'आपराधिक मामले'
                },
                attendance: {
                  icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                  bgColor: 'bg-purple-100',
                  iconColor: 'text-purple-600',
                  label: 'विधानसभा उपस्थिति'
                },
                questions_asked: {
                  icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                  bgColor: 'bg-orange-100',
                  iconColor: 'text-orange-600',
                  label: 'सवाल पूछे'
                },
                funds_utilisation: {
                  icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
                  bgColor: 'bg-green-100',
                  iconColor: 'text-green-600',
                  label: 'निधि उपयोग'
                }
              };

              const iconInfo = iconMap[key];
              const value = constituencyInfo.vidhayak_info.metadata[key as keyof typeof constituencyInfo.vidhayak_info.metadata];

              return (
                <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                  <div className={`w-12 h-12 ${iconInfo.bgColor} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                    <svg className={`w-6 h-6 ${iconInfo.iconColor}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d={iconInfo.icon} />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{iconInfo.label}</p>
                  <p className="text-lg font-semibold text-[#273F4F]">{value}</p>
                </div>
              );
            })}
          </div>


          {/* Thematic Sections */}
          <div className="space-y-4">
            {constituencyInfo?.dept_info.map((dept) => {
              const iconMap: { [key: string]: { icon: string; bgColor: string; iconColor: string } } = {
                'स्वास्थ्य': {
                  icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
                  bgColor: 'bg-red-100',
                  iconColor: 'text-red-600'
                },
                'शिक्षा': {
                  icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                  bgColor: 'bg-blue-100',
                  iconColor: 'text-blue-600'
                },
                'अपराध': {
                  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                  bgColor: 'bg-purple-100',
                  iconColor: 'text-purple-600'
                },
                'कृषि': {
                  icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
                  bgColor: 'bg-yellow-100',
                  iconColor: 'text-yellow-600'
                }
              };

              const iconInfo = iconMap[dept.dept_name] || { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', bgColor: 'bg-gray-100', iconColor: 'text-gray-600' };
              const satisfactionPercentage = dept.survey_score[0].score 

              return (
                <div key={dept.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 ${iconInfo.bgColor} rounded-lg flex items-center justify-center`}>
                      <svg className={`w-6 h-6 ${iconInfo.iconColor}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d={iconInfo.icon} />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#273F4F]">{dept.dept_name}</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    {dept.work_info.map((work, index) => (
                      <p key={index} className="text-sm text-gray-600">• {work}</p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{dept.survey_score[0]?.question}</p>
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-[#273F4F] mb-2">अन्य प्रमुख उम्मीदवार</h3>
            <p className="text-sm text-gray-600 mb-4">(पिछला चुनाव)</p>

            <div className="flex space-x-4 overflow-x-auto pb-4">
              {constituencyInfo?.other_candidates.map((candidate) => (
                <div key={candidate.id} className="flex-shrink-0 w-32 text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <img src={candidate.candidate_image_url} alt={candidate.candidate_name} className="w-full h-full rounded-full" />
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
    <Suspense fallback={
      <div className="min-h-screen bg-[#939cab] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#273F4F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <YourAreaPageContent />
    </Suspense>
  );
}
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/Header";
import type { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
const SyntaxHighlighter = dynamic<SyntaxHighlighterProps>(
  () =>
    import('react-syntax-highlighter').then(
      (mod) => mod.Prism as unknown as ComponentType<SyntaxHighlighterProps>,
    ),
  { ssr: false },
);
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const useCases = [
  {
    title: "Simple ERC20-Style Token",
    description: "A basic implementation of a fungible token, similar to the ERC20 standard. This contract allows for creating a token with a fixed supply, transferring tokens between addresses, and checking balances.",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleToken {
    string public name = "Simple Token";
    string public symbol = "STK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}`
  },
  {
    title: "Decentralized Voting System",
    description: "This smart contract facilitates a simple voting process. It allows a designated chairperson to create proposals, and registered voters can cast their votes. The contract tallies the votes to determine the winning proposal.",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Voter {
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }

    struct Proposal {
        string name;
        uint voteCount;
    }

    address public chairperson;
    mapping(address => Voter) public voters;
    Proposal[] public proposals;

    constructor(string[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function giveRightToVote(address voter) public {
        require(msg.sender == chairperson, "Only chairperson can give right to vote.");
        require(!voters[voter].voted, "The voter already voted.");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += sender.weight;
    }
}`
  },
  {
    title: "Crowdfunding Contract",
    description: "A smart contract for raising funds for a project. Contributors can send Ether to the contract, and if the funding goal is met by the deadline, the project creator can withdraw the funds. If not, contributors can claim a refund.",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Crowdfunding {
    address payable public beneficiary;
    uint public fundingGoal;
    uint public deadline;
    uint public amountRaised;

    mapping(address => uint) public contributions;
    bool public fundingGoalReached = false;
    bool public crowdfundingClosed = false;

    event GoalReached(address recipient, uint totalAmountRaised);
    event FundTransfer(address backer, uint amount, bool isContribution);

    constructor(uint _fundingGoal, address payable _beneficiary, uint _duration) {
        fundingGoal = _fundingGoal;
        beneficiary = _beneficiary;
        deadline = block.timestamp + _duration;
    }

    function contribute() public payable {
        require(!crowdfundingClosed, "Campaign is closed.");
        require(msg.value > 0, "Contribution must be greater than 0.");
        
        contributions[msg.sender] += msg.value;
        amountRaised += msg.value;
        
        emit FundTransfer(msg.sender, msg.value, true);
    }

    function checkGoalReached() public {
        require(!crowdfundingClosed, "Campaign is closed.");
        if (block.timestamp >= deadline) {
            if (amountRaised >= fundingGoal) {
                fundingGoalReached = true;
                emit GoalReached(beneficiary, amountRaised);
            }
            crowdfundingClosed = true;
        }
    }
}`
  }
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#0D1117]">
      <Header />
      <main className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Smart Contract Use Cases
            </h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-3xl mx-auto">
              Explore common examples of smart contracts that can be analyzed and secured by ChainX. These use cases demonstrate the versatility of blockchain technology.
            </p>
          </div>

          <div className="space-y-16">
            {useCases.map((useCase, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <SyntaxHighlighter language="solidity" style={vscDarkPlus} customStyle={{ margin: 0, borderRadius: '0.5rem' }}>
                    {useCase.code}
                  </SyntaxHighlighter>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
